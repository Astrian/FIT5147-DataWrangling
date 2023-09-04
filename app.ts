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
  // Clip top 10 rows for debug purpose
  const wrangledData = content.slice(0, 10)

  //output csv to ./data/wrangleed.csv
  const csvWriter = csvwriter.createObjectCsvWriter({
    path: "./data/wrangleed.csv",
    header,
  }).writeRecords(wrangledData)
}

main()