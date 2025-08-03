export default async function jpegUint8ArrayToRgb(jpegUint8Array: Uint8Array) {
  const blob = new Blob([jpegUint8Array], { type: 'image/jpeg' })

  const img = new Image()

  const url = URL.createObjectURL(blob)

  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
    img.src = url
  })

  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')

  ctx!.drawImage(img, 0, 0)

  const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height)

  const rgbData = new Uint8Array(img.width * img.height * 3)
  let rgbIndex = 0
  for (let i = 0; i < imageData.data.length; i += 4) {
    rgbData[rgbIndex++] = imageData.data[i]
    rgbData[rgbIndex++] = imageData.data[i + 1]
    rgbData[rgbIndex++] = imageData.data[i + 2]
  }

  URL.revokeObjectURL(url)

  return {
    data: rgbData,
    width: img.width,
    height: img.height,
  }
}
