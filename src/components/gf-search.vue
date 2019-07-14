<template>
  <div class="gf-search" @click="setFocus">
    <input :placeholder="placeholder" type="text" />
    <div class="gf-search__voice-button"></div>
    <div class="gf-search__regular-button">
      <img src="/images/search-button.svg" width="24" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "GFSearch",
  data() {
    return {};
  },
  methods: {
    setFocus() {
      document.querySelector(".gf-search input").focus();
    }
  },
  props: {
    placeholder: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.gf-search {
  cursor: text;
  height: 44px;
  display: flex;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #ddd;
  transition: box-shadow 0.3s;

  &:hover {
    border-color: #fff;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  }

  input {
    width: calc(100% - 100px);
    height: 85%;
    border: none;
    font-size: 16px;
    padding: 5px 10px;
    margin-left: 10px;

    &:focus {
      outline: none;
    }
  }

  .gf-search__regular-button {
    cursor: pointer;
    width: 24px;
    height: 24px;
    margin-left: 15px;
  }

  .gf-search__voice-button {
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-left: 15px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACrElEQVR42u2Xz2sTQRSAX8VSb1K8iNqKooJH2Ux6Ksn+iPQqxZMIehJB0do/IMhmQWsvHr2KSEGk0tSLIoWIYNUKij20F2/N7iaUZnYT0kYzzhMKs0HDJiTdLcwHDwKZSd63781LBiQSSW9JZdkhzfKm1Rz9mjZp/W9YdEU3vXv4HsQZ40FtNG36q5rls//Ej4tmbSS2T15Mvp3ExOPmEMQNbBtMMEyoljcFcQN7PqyAlqNfIG7gYQ0tYNIaxA1MrJPY3wImbUqBKAXSFv0tBSIVMOkvKRDtGKWN/T6FdqRAxFNoWwpEPIXqUqBT6ALU/UVgu8GW4GD3f6f9TRDYNJTDrk7YbtiqUumHwIYoUJuHERDAS0r4CvgFECgbY+cFAR7KT+g1POmCKFDNw6WggHc3fBtVb4CAoyauBgXIG+g1Xh5mRAGah6cggBd11fK/h7lOprIs0H6uRl6KAo5O7kOv4QmPiwJ4Jqqv4FiwCtXjvD2+tRmfK6kZ/ygI2HritK0rDVGgrClJ6DWMwYC/AGuCBMYcIC2V0CzvjmbRz3j3xUjn6CfeYreUJ2wQkGD75INPX1mFfsEFrrcIYCvdhC4paWQakxajpJMr0C9YFg54i7AsClRmh9/xnr0NHcInzZStk2aLwAcGMAD9pPIazvFKVDD5rdnhJeHLX5RTyRPQHpz5o66emMc9wdlPtvA8wF7Aq2BUHh1525qEo5JtR1WeOXpickO9cJIpyuD6xJmhYiZ5ytWSl3mlnuOaf+2zDaLDXmJrSgZ/MYVEugo+gSh+FkSBa4yd5Ul87DZ5XpFl/AyIEjzYjkau8WqshU2cr13HPbgX4gJOD97n465GZlyVvC9mSKloKI2iTnbwNT+gBX54H+IaXAtxJzE3ycSAFqSAFJACUkAikXD+AHj5/wx2o5osAAAAAElFTkSuQmCC)
      no-repeat -3px 0;
    background-size: 24px 24px;
  }
}
</style>
