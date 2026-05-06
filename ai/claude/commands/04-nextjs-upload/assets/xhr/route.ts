
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const uploadPath = process.env.UPPY_XHR_UPLOAD || 'public/uploads'


export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null

  console.info('formData, file', formData, file)
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = file.name.replace(/\s/g, '-')

  // Use the same upload directory as TUS server for consistency
  const uploadDir = path.join(process.cwd(), `${uploadPath}/${uuidv4()}`)
  const filepath = path.join(uploadDir, filename)

  try {
    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true }).catch(() => {
      // Directory might already exist, ignore the error
    })

    await writeFile(filepath, buffer)
    return NextResponse.json({
      message: 'File uploaded successfully',
      filename,
      filepath: `${filepath}`,
    })
  } catch (error) {
    console.error('Error saving file:', error)
    return NextResponse.json({ error: 'Error saving file' }, { status: 500 })
  }
}
