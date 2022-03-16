export default function scrollToAnchor({ currentTarget }: Event) {
  if (currentTarget) {
    const { href } = currentTarget as HTMLAnchorElement;
    const id = new URL(href).hash;
    const targetSection = document.querySelector(id);

    targetSection?.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
