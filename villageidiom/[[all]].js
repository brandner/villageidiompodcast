// villageidiom/[[all]].mpg
export async function onRequestGet(ctx) {
  // 1. Get the path requested by the user, stripping the '/media/' prefix
  const path = new URL(ctx.request.url).pathname.replace("/villageidiom/", "");

  // 2. Get the file from the R2 binding named 'MEDIA'
  const file = await ctx.env.MEDIA.get(path);

  // 3. Handle cases where the file is not found
  if (!file) {
    return new Response(null, { status: 404 });
  }

  // 4. Return the file body from R2
  return new Response(file.body, {
    headers: {
      // Important: Set the correct Content-Type for proper browser rendering
      // You might need a more robust content-type detection here in a real app
      'Content-Type': file.httpMetadata.contentType || 'audio/mpeg',
    },
  });
}
