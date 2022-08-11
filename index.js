//input welcome message here
console.log('Welcome!')

//display list of AE
const path = require('path')
const fs = require('fs')
const readline = require('readline')

// let i = '0'

// //define directory path
// let files = fs.readdirSync('./data')
// console.log(files)
// let filePath = path.join(__dirname, './data/' + files[i])
//files = './data/' + files[0]
//console.log(filePath)

// // allow user to choose which art to see
// console.log(
//   `Choose which art you would like to see: 0 Kea, 1 Kiwi, 2 Manaia, 3, Nikau, 4 Pohutakawa`
// )

//input
// change i variable to whatever number user inputs

//Step 1: Call press enter
pressEnter()
//Step 2: In the pressEnter function input image index to see desired image or press q to exit.
//Step 3: Exit or show file
//Step 4/Step stretch: Call the new comment function to prompt user for a comment if they've first viewed any image
//Step 5: Reprompt user to either view another image or now add a comment about the image they just viewed
//

//
function pressEnter() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question(
    'Which artwork would you like to see? 0 Kea, 1 Kiwi, 2 Manaia, 3, Nikau, 4 Pohutakawa. To quit, press q. To comment, press c.',
    function (input) {
      let i = ''
      // console.log('input here', input)
      // console.log('type', typeof input)
      rl.close()
      if (input == 'q') {
        process.exit()
      } else if (input == 'c') {
        addUserComment()
      } else if (
        input !== '0' &&
        input !== '1' &&
        input !== '2' &&
        input !== '3' &&
        input !== '4'
      ) {
        console.error('error not a valid number')
      } else {
        // console.log('ran')
        i = input
        let files = fs.readdirSync('./data')
        // console.log(files)
        let filePath = path.join(__dirname, './data/' + files[i])
        // console.log('i here:', i)
        // console.log('log here:', filePath, files[i])
        showArt(filePath)
      }
    }
  )
}

//read file
function showArt(filePath) {
  fs.readFile(filePath, 'utf-8', (err, contents) => {
    if (err) {
      console.error('error:', err)
    } else {
      console.log(contents)
      //Pass the contents of specified file into the pressEnter function?
      //Then keep passing the content until the append function gets the contents?
      pressEnter()
    }
  })
}

function addUserComment() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  rl.question('Type comment: ', function (input) {
    rl.close()
    let userComment = input

    // Call any functions you like here. For example:
    // Write comment to file
    append(userComment)
  })
}

function append(dataToAppend) {
  console.log('append start')
  readDataCommentFile((fileContent) => {
    //this is our callback function being passed (lines 106-112)
    console.log(fileContent)
    write(fileContent + '\n' + dataToAppend, () => {
      console.log('append finish')
      fs.readFile('./comments/comments.txt', 'utf-8', (err, allTheWords) => {
        console.log('logging the whole file...')
        console.log(allTheWords)
      })
    })
  })
}

//this function returns data from the comment file to the readDataCommentFile
function readDataCommentFile(readDataFtn) {
  fs.readFile('./comments/comments.txt', 'utf-8', (err, data) => {
    if (err) {
      console.log('err: ', err)
    } else {
      readDataFtn(data) //this function is passing the data from comments file to the readDataCommentFile as the new parameter
    }
  })
}

function write(dataToWrite, callback) {
  //call back is purely end of line 109, starting from the lambda to 110. dataToWrite is line 109 before the arrow function.
  fs.writeFile('./comments/comments.txt', dataToWrite, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('write Success')
      callback() //jumps to the point where the write function was called (line 109)
    }
  })
}
//NOTES TO SELF ABOUT CALLBACKS
//NB: essentially the callback function starts from the lambda of the function that is called and until the end of that function

//Ben's version
// function read(callback) {
//   fs.readFile('./comments.txt', 'utf-8', (err, data) => {
//     if (err) {
//       console.log('err: ', err)
//     } else {
//       callback(data)
//     }
//   })
// }

//STRETCH - convert to an input value
// const prompt = require('prompt')

// prompt.message = 'Which artwork would you like to see? 0 Kea, 1 Kiwi, 2 Manaia, 3, Nikau, 4 Pohutakawa'
// prompt.delimiter = ': '
// prompt.start()

// const choice = {
//   name: 'choice',
//   hidden: true,
//   message: 'Make your choice'
// }

// prompt.get(choice, function (err, result) {
//   // Do something with result.choice here...
// })

//show art selected

//1 turn it into an array with correct indices
//2 code the read code to read the file path

// let path = require('path')

// function read(callback) {
//   fs.readFile('./comments.txt', 'utf-8', (err, data) => {
//     if (err) {
//       console.log('err: ', err)
//     } else {
//       callback(data)
//     }
//   })
// }
