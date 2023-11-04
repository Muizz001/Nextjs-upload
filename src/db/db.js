

async function run() {
  try {
    const database = client.db('sample_mflix');

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

module.exports = { run };
