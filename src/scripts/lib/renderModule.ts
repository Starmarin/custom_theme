export default function renderModule(module: Module) {
  const els = document.querySelectorAll(`[data-vue-component="${module.NAME}"]`);

  if (els) {
    [...els].map((el) => module.default(el as HTMLElement));
  }
}
