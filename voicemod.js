const Discord = require('discord.js')
const client = new Discord.Client()
const googleSpeech = require('@google-cloud/speech')
const googleSpeechClient = new googleSpeech.SpeechClient()

const { Transform } = require('stream')

function convertBufferTo1Channel(buffer) {
  const convertedBuffer = Buffer.alloc(buffer.length / 2)

  for (let i = 0; i < convertedBuffer.length / 2; i++) {
    const uint16 = buffer.readUInt16LE(i * 4)
    convertedBuffer.writeUInt16LE(uint16, i * 2)
  }

  return convertedBuffer
}

class ConvertTo1ChannelStream extends Transform {
  constructor(source, options) {
    super(options)
  }

  _transform(data, encoding, next) {
    next(null, convertBufferTo1Channel(data))
  }
}

client.on('message', async msg => {
    if (msg.content != "-vm") {
        return
    }
    const member = msg.member
    const voiceChannel = member.voice.channel

    const connection = await voiceChannel.join()
    console.log('can you hear me')
    const dispatcher = connection.play('./beep-01a.mp3', {volume: 0});
    dispatcher.on('finish', () => {
    connection.on('speaking', async (user, speaking) => {
        if (!speaking) {
            console.log('sup')
            return
        }
        const audio = connection.receiver.createStream(user, {mode: "pcm"})
        const req_config = {encoding: "LINEAR16", sampleRateHertz: 48000, languageCode: 'en-US'}
        const request = {config: req_config}
        const recognizeStream = googleSpeechClient
        .streamingRecognize(request)
        .on('error', console.error)
        .on('data', response => {
            const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n')
            .toLowerCase()
            for (i of ['fuck', 'shit', 'bitch', 'poop', 'penis']) {
                if (transcription.includes(i)) {
                    console.log('badwrd')
                    connection.play("badword.mp3", {volume: 100})
                }
            }
            if (transcription.includes("leave now")) {
                connection.disconnect()
            }
        })

        const convert = new ConvertTo1ChannelStream();
        audio.pipe(convert).pipe(recognizeStream)
      })
    })
})


client.login("########")