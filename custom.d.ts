declare module '*.svg' {
  const content: any;
  export default content;
}

declare module 'to-querystring' {
  const content: any;
  export default content;
}

declare module '*.yml' {
  const content: { [key: string]: any };
  export default content;
}
