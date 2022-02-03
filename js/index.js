const main = document.querySelector('#main')
const nav = document.querySelector('#nav')
const title = document.querySelector('#title')
const btnRegresar = document.querySelector('#regresar')
const imageDiv = document.querySelector('#imageDiv')

const API = 'https://dog.ceo/api/breed'

// Peticiones al API

const getBreeds = async () => {
  const resp = await fetch(`${API}s/list/all`)
  const { message } = await resp.json()

  return Object.keys(message)
}

const getBreedPicture = async (breed) => {
  const resp = await fetch(`${API}/${breed}/images/random`)
  const { message } = await resp.json()

  return message
}
// Función para crear botones con el alfabeto

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

const letters = alphabet.split('')

const printAlphabetButtons = () => {
  nav.innerHTML = ''
  nav.classList.remove('grid-cols-2')
  nav.classList.add('grid-cols-4')
  title.innerText = 'Selecciona razas de perro por letra'
  imageDiv.innerHTML = ''
  letters.forEach((letter) => {
    const html = `
    <button class="uppercase font-bold px-5 py-3 bg-gray-200 hover:text-gray-200 rounded text-gray-600 hover:bg-gray-600 hover:shadow-gray-200/50 hover:shadow-sm">${letter}</button>
    `

    nav.insertAdjacentHTML('beforeend', html)
  })
}

// Creando botones del alfabeto luego de llamada al api

getBreeds().then((breeds) => {
  printAlphabetButtons()
})

// Event Listeners

nav.addEventListener('click', (e) => {
  if (e.target.nodeName !== 'BUTTON') {
    return
  }

  // Añadiendo Lógica para filtrar por nombre

  if (nav.classList.value.includes('grid-cols-4')) {
    const letter = e.target.innerHTML
    getBreeds().then((breeds) => {
      const filteredBreeds = breeds.filter((breed) => breed.startsWith(letter))
      if (filteredBreeds.length < 1) {
        alert(
          `No encontramos razas que empiezen con la letra "${letter.toUpperCase()}"`
        )
        return
      }

      let fragment = document.createDocumentFragment()

      filteredBreeds.forEach((breed) => {
        const html = `
          <button class="uppercase px-5 py-3 bg-gray-200 hover:text-gray-200 rounded text-gray-600 hover:bg-gray-600 hover:shadow-gray-200/50 hover:shadow-sm">${breed}</button>`

        let button = document.createElement('button')
        button.classList.add(
          'uppercase',
          'px-5',
          'py-3',
          'bg-gray-200',
          'hover:text-gray-200',
          'rounded',
          'text-gray-600',
          'hover:bg-gray-600',
          'hover:shadow-gray-200/50'
        )
        button.innerText = breed
        fragment.appendChild(button)
      })

      nav.innerHTML = ''
      nav.classList.remove('grid-cols-4')
      nav.classList.add('grid-cols-2')
      title.innerText = 'Selecciona una raza'
      nav.appendChild(fragment)
    })
  }

  if (nav.classList.value.includes('grid-cols-2')) {
    const breed = e.target.innerHTML
    nav.innerHTML = ''
    imageDiv.innerHTML = `
    <div>
      <div style="border-top-color:transparent"
          class="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"></div>
    </div>
    `

    getBreedPicture(breed).then((image) => {
      const html = `
        <img class='w-2/4 block self-center' src='${image}' alt='${breed}' />
      `

      title.innerText = breed.toUpperCase()
      imageDiv.innerHTML = html
    })
  }
})

// Botón para regresar a la primera pantalla

btnRegresar.addEventListener('click', () => {
  printAlphabetButtons()
})
