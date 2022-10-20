export default (context, inject) => {
  inject('hello', (msg) => {
    alert(msg)
  })
}
