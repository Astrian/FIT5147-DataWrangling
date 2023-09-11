const fs = require("fs")
import csvreader from "csvtojson"
import * as csvwriter from "csv-writer"

const csvFilePath = "./data/top_10000_1960-now.csv"

async function main() {
  const content = await csvreader().fromFile(csvFilePath)
  // console.log(content[0])

  // Read header
  const header: { id: string, title: string }[] = []
  for (const key in content[0]) {
    header.push({ id: key, title: key })
  }

  // Wrangle data
  let counter = 0
  let wrangledData = content.map((row: Track): Track | null => {
    console.log(`Wrangling ${counter++}/${content.length}`)

    // cut date to year
    row['Album Release Date'] = row['Album Release Date'].slice(0, 4)
    
    // If "Track Name" is empty, skip this row
    if (row['Track Name'] === '') {
      return null
    }

    // If "Album URI" is empty, skip this row
    if (row['Album URI'] === '') {
      return null
    }

    return row
  })

  // Remove null
  wrangledData = wrangledData.filter((row: Track | null) => row !== null)
  
  //output csv to ./data/wrangleed.csv
  const csvWriter = csvwriter.createObjectCsvWriter({
    path: "./data/wrangleed.csv",
    header,
  }).writeRecords(wrangledData as Track[])
}

main()

// Types declare
interface Track {
  "Track URI": string
  "Track Name": string
  "Artist URI(s)": string
  "Artist Name(s)": string
  "Album URI": string
  "Album Name": string
  "Album Artist URI(s)": string
  "Album Artist Name(s)": string
  "Album Release Date": string
  "Album Image URL": string
  "Disc Number": number
  "Track Number": number
  "Track Duration (ms)": number
  "Track Preview URL": string
  "Explicit": boolean
  "Popularity": number
  "ISRC": string
  "Added By": string
  "Added At": string
  "Artist Genres": string
  "Danceability": number
  "Energy": number
  "Key": number
  "Loudness": number
  "Mode": number
  "Speechiness": number
  "Acousticness": number
  "Instrumentalness": number
  "Liveness": number
  "Valence": number
  "Tempo": number
  "Time Signature": number
  "Album Genres": string
  "Label": string
  "Copyrights": string
}