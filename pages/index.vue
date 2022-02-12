
<script>
export default {
  asyncData({ redirect, store }) {
    console.log(store);
    return redirect("/home");
  },
};
</script>