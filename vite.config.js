import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readdir, rename, stat, unlink } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import sharp from 'sharp'

async function optimizeJpegs(directory) {
  let count = 0
  let savedBytes = 0
  const entries = await readdir(directory, { withFileTypes: true })

  for (const entry of entries) {
    const filePath = join(directory, entry.name)
    if (entry.isDirectory()) {
      const result = await optimizeJpegs(filePath)
      count += result.count
      savedBytes += result.savedBytes
      continue
    }
    if (!['.jpg', '.jpeg'].includes(extname(entry.name).toLowerCase())) continue

    const optimizedPath = `${filePath}.optimized`
    const originalSize = (await stat(filePath)).size
    try {
      await sharp(filePath)
        .rotate()
        .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 82, progressive: true })
        .toFile(optimizedPath)
      const optimizedSize = (await stat(optimizedPath)).size
      if (optimizedSize < originalSize) {
        await rename(optimizedPath, filePath)
        count += 1
        savedBytes += originalSize - optimizedSize
      }
    } finally {
      await unlink(optimizedPath).catch(() => {})
    }
  }

  return { count, savedBytes }
}

function optimizePublicJpegs() {
  let outputDirectory
  return {
    name: 'optimize-public-jpegs',
    apply: 'build',
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const { count, savedBytes } = await optimizeJpegs(outputDirectory)
      if (count) console.info(`Optimized ${count} JPEGs, saved ${(savedBytes / 1024 / 1024).toFixed(1)} MB`)
    },
  }
}

export default defineConfig({
  plugins: [vue(), optimizePublicJpegs()],
})
