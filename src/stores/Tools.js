const Tools = {
  exporJson(name, data) {
    const blob = new Blob([data])
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = name
    link.click()
  },
}

export default Tools
