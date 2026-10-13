import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { execFile } from 'child_process'
import path from 'path'
export default defineConfig({

  plugins: [
    react(),
    {
      name: 'api-search-server',
      configureServer(server) {
        server.middlewares.use('/api/search', (req, res) => {
          const urlObj = new URL(req.url || '', `http://${req.headers.host}`)
          const query = urlObj.searchParams.get('query') || ''
          const sources = urlObj.searchParams.get('sources') || 'olx,amazon'

          if (!query.trim()) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify([]))
            return
          }

          const scriptPath = path.resolve('src/server/fetcher.py')
          execFile('python3', [scriptPath, query, sources], (error, stdout) => {
            res.setHeader('Content-Type', 'application/json')
            if (error) {
              console.error('Fetcher error:', error)
              res.end(JSON.stringify([]))
              return
            }
            res.end(stdout || '[]')
          })
        })
      },
    },
  ],
  server: { host: true },
})

