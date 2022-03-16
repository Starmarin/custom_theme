<template>
  <div
    class="zoom-on-hover"
    :class="classes"
    @mousemove="move"
    @mouseenter="zoom"
    @mouseleave="unzoom"
    v-scroll-lock="false"
  >
    <img class="normal" :class="styleClass" :id="id" ref="normal" v-bind="imgNormalAttrs" />
    <img class="zoom" :class="styleClass" ref="zoom" @touchmove.stop.prevent="move"
      :style="`top: ${position.y}px; left: ${position.x}px; transform: scale(${isZooming ? scale : 1})`"
      v-bind="imgZoomAttrs"/>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    styleClass: {
      type: String,
      required: false
    },
    imgNormalAttrs: {
      type: Object,
      required: true
    },
    imgZoomAttrs: {
      type: Object,
      required: true
    },
    scale: {
      type: Number,
      default: 2
    },
    disabled: {
      type: Boolean,
      default: false
    },
    zooming: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isZooming: false,
      position: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    pageOffset(el) {
      // -> {x: number, y: number}
      // get the left and top offset of a dom block element
      let rect = el.getBoundingClientRect();

      return {
        y: rect.top,
        x: rect.left
      };
    },
    zoom(e) {
      if (this.disabled) return;
      this.isZooming = true;
      this.move(e);
    },
    unzoom() {
      if (this.disabled) return;
      this.isZooming = false;
      this.zoomCenter();
    },
    zoomCenter() {
      if (this.disabled) return;

      this.isZooming = true;
      let x = this.$refs.normal.offsetWidth / 2;
      let y = this.$refs.normal.offsetHeight / 2;
      this.position.x = -x;
      this.position.y = -y;
    },
    move(event) {
      if (this.disabled) return;
      this.isZooming = true;
      let clientX = event.clientX;
      let clientY = event.clientY;

      if('TouchEvent' in window && event instanceof window.TouchEvent) {
        clientX = event.changedTouches[0].clientX;
        clientY = event.changedTouches[0].clientY;
      }

      let offset = this.pageOffset(this.$el);
      let zoom = this.$refs.zoom;
      let normal = this.$refs.normal;
      let relativeX = clientX - offset.x;
      let relativeY = clientY - offset.y;
      let normalFactorX = relativeX / normal.offsetWidth;
      let normalFactorY = relativeY / normal.offsetHeight;
      let x =
        normalFactorX *
        (zoom.offsetWidth * this.scale - normal.offsetWidth);
      let y =
        normalFactorY *
        (zoom.offsetHeight * this.scale - normal.offsetHeight);

      this.position.x = -x;
      this.position.y = -y;
    }
  },
  computed: {
    classes() {
      const { isZooming } = this;
      return isZooming ? 'zoom-active' : 'zoom-inactive';
    },
    touchStyle() {
      const zooming = this.isZooming;

      return {
        touchAction: zooming ? 'none' : 'default',
      }
    }
  },
  watch: {
    zooming(newValue) {
      this.isZooming = newValue;
    },
  }
};
</script>
<style>
.zoom-on-hover {
  display: flex;
  position: relative;
  overflow: hidden;
  font-size: 0;
  min-width: 100%;
}

.zoom-on-hover .normal {
  width: 100%;
  position: relative;
  z-index: 20;
}

.zoom-on-hover .zoom {
  position: absolute;
  opacity: 0;
  transform-origin: top left;
  z-index: 10;
}

.zoom-on-hover.zoom-active .normal {
  opacity: 0;
  z-index: 10;
}

.zoom-on-hover.zoom-active .zoom {
  opacity: 1;
  z-index: 30;
  touch-action: manipulation;
}
</style>
