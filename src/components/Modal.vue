<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-container" @click.stop="">
        <button class="close" @click="$emit('close')">
          <i class="UI-icon UI-close-alt"></i>
        </button>
        <div class="modal-header">
          <slot name="header">
            default header
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            default body
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            default footer
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    overflow: hidden;
    // left: 0px;
    left: 50px;
    width: 100%;
    height: 100%;
    // background-color: rgba(0, 0, 0, .5);
    display: flex;
    // justify-content: center;
    // align-items: center;
    transition: opacity .3s ease;
  }

  .modal-container {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 300px;
    width: 70vw;
    max-width: 600px;
    // max-height: 90%;
    height: 100%;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
  }

  .modal-header h3 {
    margin-top: 0;
  }

  .modal-body {
    flex: 1;
    margin: 20px 0;
    overflow-y: scroll;
    overscroll-behavior: contain;
  }

  .close {
    position: absolute;
    top: 8px;
    right: 8px;
    float: right;
    background-color: transparent;
    color: #231f20;
    padding: 6px 8px;
    border: 1px solid transparent;

    &:hover {
      background-color: transparent;
      border: 1px solid #231f20;
    }
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    // opacity: 0;
  }

  .modal-leave-active {
    // opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    // -webkit-transform: scale(1.1);
    // transform: scale(1.1);
    transform: translateX(-100%);
  }
</style>