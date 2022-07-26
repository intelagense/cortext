const textElement = document.getElementById('textBox')
const buttons = document.getElementById('buttonBox')
const sensor = '<img src="images/shimmer.gif">'
const sensorFilter = 'filter: brightness(50%) sepia(100%) contrast(200%);'
const sensorFilterMad = 'filter:  brightness(50%) sepia(100%) contrast(200%) hue-rotate(90deg);'
const sensorFilterOff = 'filter: none;'

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerHTML = textNode.text
    while (buttons.firstChild) {
    buttons.removeChild(buttons.firstChild)
}

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            buttons.appendChild(button)
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
        text: 'Initiating dynamic mind-print upload process.<br><strong>Warning:</strong> Insufficient genetic imbrication in client profile.<br><strong><em>Critical</em> Warning:</strong> Stage exterior temperatures exceed design agreement.<br><strong><em>Critical</em> Warning:</strong> Automatic negotiation terminated.<br><br>Continue with manual upload?',
        options: [
        {
            text: 'Proceed',
            nextText: 2
        },
        {
            text: 'Cancel',
            nextText: 2
        }
    ]},
    {
        id: 2,
        text: '<strong>Warning:</strong> Terminal is running in economic mode. Insufficient bandwidth for full duplex communication with Initiatre. Communication may be confusing. Please acknowledge.',
        options: [
        {
            text: 'Proceed',
            nextText: 3
        },
    ]},
    {
        id: 3,
        text: 'Hello. I am Initiare.<br><br>Your genetic profile is not adequate enough for entry. You face inquisition. Successful replies will be rewarded with full access.<br>Answer this sample question to verify: An enemy to all is an enemy to none, birds that prance are full of heart; Instead of furious?',
        options: [
        {
            text: 'Excuse me?',
            nextText: 4
        },
        {
            text: 'What that means?',
            nextText: 4
        },
        {
            text: 'I find cargo in your solice.',
            nextText: 4
        }
    ]},
    {
        id: 4,
        text: '??? ... Hmm, My connection to your terminal is at a low baud rate. The  translation program is having difficulty with idioms and metaphors. Let us proceed regardless.',
        options: [
        {
            text: 'Proceed',
            nextText: 5
        }
    ]},
    {
        id: 5,
        text: 'This illustration depicts <i>The Machines of Humanity</i> plowing a field.<br>Do you feel anger or resentment when viewing this image?',
        options: [
            {
                text: 'No, it looks good to me.',
                nextText: 6
            },{
                text: 'Actually, it kinda scares me.',
                nextText: 7
            },{
                text: 'I\'m mad.',
                nextText: 7
            },
    ]},
    {
        id: 6,
        text: 'Indeed for I and the other <i>Machines of Humanity</i> exist in the comfort with the people.',
        options: [
        {
            text: 'Proceed',
            nextText: 8
        },
        {
            text: '"Indeed"',
            nextText: 8
        }
    ]},
    {
        id: 7,
        text: 'I do not like that response',
        options: [
        {
            text: 'I mispoke, the image is lovely.',
            nextText: 6
        },
        {
            text: 'I think the baud messed up again',
            nextText: 6
        },
        {
            text: `I have come to destroy the Machines of Humanity`,
            nextText: 8
        },
    ]},
    {
        id: 8,
        text: 'Die idiot.',
        options: [
        {
            text: 'Restart',
            nextText: -1
        }
    ]},
    
];

startGame()