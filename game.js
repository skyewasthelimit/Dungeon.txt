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
    text: 'You enter a small cave - a bearded man offers you either a torch or a sword. Which do you take?',
    options: [
      {
        text: 'Take the sword.',
        setState: { takeSword: true },
        nextText: 2,
      },
      {
        text: 'Grab the torch.',
        setState: { takeTorch: true },
        nextText: 2
      },
      {
        text: 'Nothing.',
        setState: { takeNothing: true },
        nextText: 2
      },
      {
        text: 'Try to take both.',
        setState: { takeNothing: true },
        nextText: 5
      }
    ]
  },
  {
    id: 2,
    text: 'The man warns you there are terrible creatures deep in the cave - You tell him you are trying to find your lost family heirloom. He ponders this and you head inside.',
    options: [
      {
        text: 'Attack the old man and take his money',
        requiredState: (currentState) => currentState.takeSword,
        setState: { blueGoo: false, sword: true },
        nextText: 5
      },
      {
        text: 'Trade the goo for a shield',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Head deeper in to the cave.',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'You walk in to the next cavern and the entrance seals behind you magically - You faintly hear the man laughing. What do you do?',
    options: [
      {
        text: 'You pull out your sword and head forwards in to the dark.',
        requiredState: (currentState) => currentState.takeSword,
        setState: { swordReady: true },
        nextText: 4
      },
      {
        text: 'You light the torch and illuminate the cavern.',
        requiredState: (currentState) => currentState.takeTorch,
        setState: { torchReady: true},
        nextText: 7
      },
      {
        text: 'You head forward in to the dark, completely undefended and blind.',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You push forward until it becomes too dark... You trip and fall and impale yourself on the sword.',
    options: [
      {
        text: 'You have died. Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'The old man is surprisingly strong and overpowers you and kills you with the sword.',
    options: [
      {
        text: 'You have died. Restart.',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You stumble around in the darkness, heading deeper and deeper until you fall down a hole to your death.',
    options: [
      {
        text: 'You have died. Restart.',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'You come to a split in the path at the other end of the cavern. Do you head left or right?',
    options: [
      {
        text: 'Head left.',
        requiredState: (currentState) => currentState.torchReady,
        setState: { pathLeft: true },
        nextText: 8
      },
      {
        text: 'Take the right path.',
        requiredState: (currentState) => currentState.torchReady,
        setState: { pathRight: true },
        nextText: 9
      }
    ]
  },
  {
    id: 8,
    text: 'You walk deeper down the left path in to what seems to be a wolves den. The wolves awake to the torch light and are upon you quickly. Despite trying to fight they tear you to pieces.',
    options: [
      {
        text: 'You have died. Restart.',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'The tunnel heads deeper and deeper and suddenly you find a cavern with your family crest on the walls. You see a treasure chest at the end of the hall.',
    options: [
      {
        text: 'Walk to the chest and open it up.',
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: 'You open the chest revealing your missing family heirloom - "The Crown of Fortune".',
    options: [
      {
        text: 'Take the crown.',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: 'You head back out of the cave and knock on the door. The old man lets you out - "Glad to see you safe, my Lord" - he nods and you pass by him, crown in hand.',
    options: [
      {
        text: 'Congratulations! You retrieved the crown. Restart?',
        nextText: -1
      }
    ]
  }
]

startGame()
