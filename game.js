const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You are bored in the lockdown. You and your friends plan a ride. You went to a public park and spent an hour on the trails. Now you are tired and hungry',
    options: [
      {
        text: 'I will search for a hotel',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Going to a hotel can be dangerous. I will rather sleep empty stomach than die and never get to eat again',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You found a nice restaurant nearby.',
    options: [
      {
        text: 'This place is following proper covid rules!!!. Everyone is wearing mask. We should dine in',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 4
      },
      {
        text: 'I will order food online',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'All the glitters is not gold (ø_ø) and so was this hotel . After a week you find out that you are suffering from covid ಥ◡ಥ . Get well soon',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Your food has arrived!!! The delivery guy is at your door step . You rush to the door',
    options: [
      {
        text: 'Are you forgetting to wear something ?. Think again.... < Hint : A word starting with M :) > . After you are done thinking CLICK ME!!! ',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'okay i forgot my.......',
    options: [
      {
        text: 'Yeah i get it . Thanks for the remainder :)',   
        nextText: 8
      },
      {
        text: ' No i guess ▔\▁〷●‿●〷▁/▔',
        nextText: 9
      }
    ]
  },
  {
    id: 8,
    text: 'Great!!! you were forgetting your MASK. You saved your life there. Enjoy your meal ✿◠‿◠',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You forgot your mask Ծ_Ծ. Your delivery guy was suffering from covid. And you caught covid as well ಥ_ಥ',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  }
]

startGame()