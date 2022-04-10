<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <input type="text" v-model="form.judul" placeholder="Judul" autofocus />
      <input type="text" v-model="form.deskripsi" placeholder="Deskripsi" />
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <pre>{{ data }} {{ result }}</pre>
    <ul v-for="(item, index) in data" :key="index">
      <li>
        {{ item.judul }}
        <small>{{ item.deskripsi }}</small>
        <b-button variant="link" @click="deleteItem(item)">Delete</b-button>
        <b-button variant="link" @click="updateItem(item)">Update</b-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        judul: "",
        deskripsi: "",
      },
      data: [],
    };
  },
  mounted() {
    this.initFirebase();
  },
  methods: {
    initFirebase() {
      const database = this.$fire.database;
      const kelasRef = database.ref("kelas");
      kelasRef.on("value", this.result, this.error);
    },
    result(items) {
      this.data = [];
      items.forEach((item) => {
        let data = {
          id: item.key,
          judul: item.judul,
          deskripsi: item.deskripsi,
        };
        this.data.push(data);
      });
    },
    error(items) {
      console.log(items);
    },
    onSubmit(data) {
      const database = this.$fire.database;

      const kelasRef = database.ref("kelas");
      kelasRef.push(this.form);
    },
    onReset(event) {
      event.preventDefault();
      this.form.judul = "";
      this.form.deskripsi = "";
    },
    deleteItem(item) {
      console.log(item);
      const database = this.$fire.database;
      database.ref(`/kelas/${item.id}`).remove();
    },
    updateItem(item) {
      console.log(item);
      // const database = this.$fire.database
      // database.ref(`/kelas/${item.id}`).update()
    },
  },
};
</script>