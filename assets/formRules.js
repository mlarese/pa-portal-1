export const required = (text) => v => !!v || text
export const email = (text) => v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(v) || text
export const length = (text, length) => v => (v.length >= length) || text
