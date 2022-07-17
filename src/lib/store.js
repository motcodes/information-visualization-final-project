import { writable } from 'svelte/store'

// activeCountry is a "global" store which can be accessed by importing it
// since it's initalized outside of a component
// activeCountry gets the currently hovered/active Country on a map
export const activeCountry = writable({})
