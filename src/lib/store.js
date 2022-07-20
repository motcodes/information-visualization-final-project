import { writable } from 'svelte/store'

// activeCountry is a "global" store which can be accessed by importing it
// since it's initalized outside of a component
// activeCountry gets the currently hovered/active Country on a map
function createActiveCountry() {
  const initalState = { isActive: false, x: 0, y: 0 }
  const { subscribe, set, update } = writable(initalState)

  // setFeature only updates the feature part of the store
  // setPosition only updates x and y part of the store
  // toggleActive toggles the isActive flag
  // reset sets the store back to the inital value
  return {
    set,
    subscribe,
    update,
    setFeature: (item) => update((prev) => ({ ...prev, ...item })),
    setPosition: (x, y) => update((prev) => ({ ...prev, x: x, y: y })),
    toggleActive: () => update((prev) => ({ ...prev, isActive: !prev.isActive })),
    reset: () => set(initalState)
  }
}
export const activeCountry = createActiveCountry()
