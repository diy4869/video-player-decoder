const a = 1

console.log(a)

function change () {
  const fileElement = document.querySelectorAll('input')[0]
  const file = fileElement.files
  const reader = new FileReader()

  reader.onload = (e) => {
    console.log(e.target.result)
    const buffer = e.target.result as ArrayBuffer
    const dateView = new DataView(buffer)
    const unit8Array = new Uint8Array(buffer)
    // magic number 为 array buffer 判断格式的方法
    const magicNumber = dateView.getUint32(0, false).toString(16).toUpperCase()
    console.log(magicNumber)
    const map = {
      // mkv mka mks mk3d webm
      mkv: {
        start: 0,
        length: 4,
        magicNumber: '1A 45 DF A3',
        format: 'mkv'
      },
      mp4: {
        start: 4,
        length: 8,
        magicNumber: '66 74 79 70 69 73 6F 6D',
        format: 'mp4'
      }
    }

    const values = Object.values(map)
    console.log(values)
    const result = values.find(item => {
      const magicNumber = unit8Array.slice(item.start,  item.start + item.length).reduce((str, current) => {
        return str.concat(current.toString(16).toUpperCase())
      }, [])

      console.log(item.magicNumber + '=====' +  magicNumber.join(' '))
      return item.magicNumber === magicNumber.join(' ')
    })

    console.log(unit8Array, unit8Array.slice(5, 200).toString(16))
    
  }
  
  console.log(reader)
  reader.readAsArrayBuffer(file[0])
  // reader.readAsBinaryString(file[0])

}