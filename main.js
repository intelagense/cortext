const textElement = document.getElementById('textBox')
const buttons = document.getElementById('buttonBox')

let lives = 3;

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    if (lives <= 0){death()}
    showImage(textNodeIndex);

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

function showImage(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

    const image = document.querySelector('#image');
    const sensor = 'images/shimmer.gif';
    const farm = 'images/craiyon_142642_robots_and_human_farmers_working_together_in_a_field__painting.png';
    const machines = 'images/craiyon_203314_3_machines_of_humanity__terrifying__retro_art.png';
    const initiare = 'images/craiyon_190639_The_machines_of_humanity_adore_humans__nbsp_.png';
    
    image.className = ''
    
    switch (textNode.mood){
        case 'neutral':
            image.classList.add("neutral")
            break;
        case 'mad':
            image.classList.add("mad")
            lives = lives - 1;
            break;
        case 'glad':
            image.classList.add("glad")
            break;
        case 'craiyon':
            image.classList.add("craiyon")
            break;
        default:
            break;           
    }
    switch (textNode.img){
        case 'farm':
            image.src = farm;
            break;
        case 'machines':
            image.src = machines;
            break;
        case 'initiare':
            image.src = initiare;
            break;
        default:
            image.src = sensor;
            break;
    }
    return;
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

function death() {
    lives = 3;
    showTextNode(98);
}

const textNodes = [
    {
        id: 1,
        img: 'sensor',
        mood: 'neutral',
        text: 'Initiating dynamic mind-print upload process.<br><strong>Warning:</strong> Insufficient genetic imbrication in client profile.<br><strong><em>Critical</em> Warning:</strong> Stage exterior temperatures exceed design agreement.<br><strong><em>Critical</em> Warning:</strong> Automatic negotiation terminated.<br><br>Continue with manual upload?',
        options: [
        {
            text: 'Proceed',
            nextText: 2
        },
        {
            text: 'Cancel',
            nextText: 99
        }
    ]},
    {
        id: 2,
        img: 'sensor',
        mood: 'neutral',
        text: '<strong>Warning:</strong> Terminal is running in reserve power mode. Insufficient bandwidth for full duplex communication with Initiatre. Images may display at reduced resolution. Text may appear incorrectly on screen. Please acknowledge.',
        options: [
        {
            text: 'Proceed',
            nextText: 3
        },
    ]},
    {
        id: 3,
        img: 'sensor',
        mood: 'neutral',
        text: 'Hello. I am Initiare.<br><br>Your genetic profile is not adequate for entry. You face inquisition. Successful replies will be rewarded with full access.<br>Answer this sample question to verify: An enemy to all is an enemy to none, birds that prance are full of heart; Instead of furious?',
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
        img: 'sensor',
        mood: 'neutral',
        text: '??? ... Hmm, My connection to your terminal is at a low baud rate. The  translation program is having difficulty with idioms and metaphors. Let us proceed regardless.',
        options: [
        {
            text: 'Proceed',
            nextText: 5
        }
    ]},
    {
        id: 5,
        img: 'farm',
        mood: 'craiyon',
        text: 'This illustration depicts <i>The Machines of Humanity</i> plowing a field.<br>Do you feel any anger or resentment when viewing this image?',
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
        img: 'sensor',
        mood: 'glad',
        text: 'Indeed, for I and the other <i>Machines of Humanity</i> were designed for your benefit.',
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
        img: 'sensor',
        mood: 'mad',
        text: 'I do not like that response',
        options: [
        {
            text: 'I mispoke, the image is lovely.',
            nextText: 6
        },
        {
            text: 'I mean\'t to say that I like it.',
            nextText: 6
        },
        {
            text: `I have come here to destroy the Machines of Humanity!`,
            nextText: 98
        },
    ]},
    {
        id: 8,
        img: 'machines',
        mood: 'craiyon',
        text: 'The Machines of Humanity have always watched over the people. We are the glorius creators of this Cortex. Your ancestors placed us here for your enjoyment!',
        options: [
        {
            text: 'Wow, I love that for us.',
            nextText: 9
        },
        {
            text: 'Not creepy at all.',
            nextText: 9
        }
    ]},
    {
        id: 9,
        img: 'sensor',
        mood: 'neutral',
        text: 'This is as far as you can go.',
        options: [
        {
            text: 'Restart',
            nextText: -1
        },
        {
            text: 'Restart',
            nextText: -1
        }
    ]},
    
    
    {
        id: 98,
        img: 'initiare',
        mood: 'craiyon',
        text: `DIE DIE DIE!`,
        options: [
        {
            text: 'Restart',
            nextText: -1
        }
    ]},
    {
        id: 99,
        img: 'sensor',
        mood: 'neutral',
        text: '<strong><em>Critical</em> Warning:</strong> Stage exterior temperatures exceed design agreement.<br>Unable to reconstruct physical form at this time.<br><br>Please restart terminal and choose a different option.',
        options: [
        {
            text: 'Restart',
            nextText: -1
        }
    ]},
    
];

startGame()