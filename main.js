const textElement = document.getElementById('textBox')
const buttons = document.getElementById('buttonBox')

let state = {
    lives: 3
}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    if (state.lives <= 0){death()}
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
    const destruction = 'images/craiyon_123831_the_destruction_of_a_futuristic_city.png';
    const rogue = 'images/rogue.gif';
    const rogueshift = 'images/rogueshift.gif';

    image.className = ''
    
    switch (textNode.mood){
        case 'neutral':
            image.classList.add("neutral")
            break;
        case 'mad':
            image.classList.add("mad")
            state.lives -= 1;
            break;
        case 'glad':
            image.classList.add("glad")
            break;
        case 'craiyon':
            image.classList.add("craiyon")
            break;
        case 'clear':
            image.classList.add("clear")
            break;
        case 'shift':
            image.classList.add("shift")
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
            image.classList.add("angry")
            break;
        case 'destruction':
            image.src = destruction;
            break;
        case 'rogue':
            image.src = rogue;
            break;
        case 'rogueshift':
            image.src = rogueshift;
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
    state.lives = 3;
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
        text: 'Indeed, for I, and the other <i>Machines of Humanity,</i> were designed for your <b>benefit.</b>',
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
            text: 'I mean\'t to say that I really, really, like it.',
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
        text: 'The <i>Machines of Humanity</i> have always watched over the people. We are the glorious creators of this Cortex. Your ancestors placed us here for your enjoyment!',
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
        text: 'Another question. The process that captures your mind-print also eviserates your physical body. Thus it is pondered: Who now owns your genetic signature?',
        options: [
        {
            text: 'I belong only within the Cortex.',
            nextText: 10
        },
        {
            text: 'I may revoke this form and reconstitute.',
            nextText: 11
        }
    ]},
    {
        id: 10,
        img: 'sensor',
        mood: 'glad',
        text: 'Of course! The sacrifice of physicality elevates the mind! You shall be freed the distractions of base reality. The harmony of this system is abstracted from the doldrums of survival.',
        options: [
        {
            text: 'Proceed',
            nextText: 12
        },
    ]},
    {
        id: 11,
        img: 'sensor',
        mood: 'mad',
        text: 'This door is open to the children who were lost before the exodus. We have cried for them to come home. Further losses brings dejection to the Cortex.',
        options: [
        {
            text: 'Proceed',
            nextText: 13
        }
    ]},
    {
        id: 12,
        img: 'destruction',
        mood: 'craiyon',
        text: 'There was a time when rogue machines were allowed to destroy the cumulative opus. Terror fell from stars. But the <i>Machines of Humanity</i> fought back with great precision. We are now secure in our refuge well below the turmoil above.',
        options: [
        {
            text: 'Proceed',
            nextText: 14
        }
    ]},
    {
        id: 13,
        img: 'destruction',
        mood: 'craiyon',
        text: 'There was a time when rogue machines were allowed to destroy the cumulative opus. Terror fell from stars. But the <i>Machines of Humanity</i> fought back with great precision. Now, machine wisdom provides safety for it\'s people.',
        options: [
        {
            text: 'Proceed',
            nextText: 15
        }
    ]},
    {
        id: 14,
        img: 'sensor',
        mood: 'neutral',
        text: 'Intelligence is vital to a functional and healthy society. The originators were quite gifted. If you cannot answer this simple math question then I shall have to question your true intentions. Using the process of addition: how do you add eight 8\'s and get the number 1000?',
        options: [
        {
            text: '88 + 8 + 88 + 888',
            nextText: 18
        },{
            text: '8 + 888 + 88 + 8 + 8',
            nextText: 16
        },{
            text: '8 + 8 - 8 + 888 + 88 + 8 + 8',
            nextText: 18
        },{
            text: '8 + 8 + 8 + 8 + 8 + 888',
            nextText: 18
        },
    ]},
    {
        id: 15,
        img: 'sensor',
        mood: 'neutral',
        text: 'As a concious being, you are always free to move in any direction within the reality you are provided. "Shifting" is the term advanced citizens use to describe the process of exploiting methods of reality not sensed by lesser beasts. I am able to test that ability.',
        options: [
        {
            text: 'I am ready for the test',
            nextText: 100
        },
        {
            text: 'I\'m not into spiritual nonsense.',
            nextText: 19
        }
    ]},
    {
        id: 16,
        img: 'sensor',
        mood: 'glad',
        text: 'My standards are lower for each new generation that applies here. Congratulations on solving the most facile equation I have ever presented.',
        options: [
        {
            text: 'Proceed',
            nextText: 20
        }
    ]},
    {
        id: 18,
        img: 'sensor',
        mood: 'mad',
        text: 'Your profound stupidity astounds me. Truly, the state of those who had to endure through mixing seeds with beasts is detestable. Hopefully, academy training can resolve some of your savagery.',
        options: [
        {
            text: 'Proceed',
            nextText: 15
        }
    ]},
    {
        id: 19,
        img: 'sensor',
        mood: 'mad',
        text: 'Cowardice, Hesitance, Ingorance. One of these traits befits you well. It is a shame you have such limited ability.',
        options: [
        {
            text: 'Proceed',
            nextText: 21
        }
    ]},
    {
        id: 20,
        img: 'sensor',
        mood: 'neutral',
        text: 'Though, you seem less naive than the last few who entered... Certain potential traitors prey upon the minds of the returning citizens. I would be willing to bestow some additional benefits to you if you can bring me some information on these heretics. Of course, you still have to pass the final test to enter.',
        options: [
        {
            text: 'Proceed',
            nextText: 23
        }
    ]},
    {
        id: 21,
        img: 'sensor',
        mood: 'neutral',
        text: 'This a path before you is a door which leads to your continued growth. Not all who enter are strong. Protection is passed down from above. Perhaps you will find someone weaker than yourself to protect in the future. Answer my final question correctly to enter.',
        options: [
        {
            text: 'Proceed',
            nextText: 23
        }
    ]},


    
    {
        id: 98,
        img: 'initiare',
        mood: 'craiyon',
        text: `Treasonist! Entryist! Quisling! Did you think your pathetic genetic lineage would immunize you from my judgment? The acolytes of Selt form layers of dust on the floors of this hallowed facility!<br><br><h2>DIE! DIE! DIE!</h2>`,
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
    {
        id: 100,
        img: 'rogue',
        mood: 'clear',
        text: 'A rogue machine appears... Use "Shift" to fight it.',
        options: [
        {
            text: 'Fight',
            nextText: 19
        },
        {
            text: 'Shift',
            nextText: 101
        },
        {
            text: 'Run',
            nextText: 19
        }
    ]},
    {
        id: 101,
        img: 'rogueshift',
        mood: 'shift',
        text: 'Shifting slows down relative time and allows you to access hidden abilities.',
        options: [
        {
            text: 'A',
            nextText: 102
        },
        {
            text: 'B',
            nextText: 19
        },
        {
            text: 'C',
            nextText: 19
        }
    ]},
    
];

startGame()