  async function extractStream(url, prompt) {
    const res = await fetch("https://api.yellowcake.dev/v1/extract-stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "yc_live_KPElPsJ6Sf9H_m5naIWmeOtAxC3Z5f396OVkBsnZwXE=",
      },
      body: JSON.stringify({ url, prompt }),
    });

    return res.body;
  }

  console.log(extractStream("https://www.allrecipes.com/recipe/17481/simple-white-cake/", "Get the ingredients needed for the recipe & their amounts"))
