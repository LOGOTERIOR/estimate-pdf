document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const company = document.getElementById("company").value.trim();
  const pdfName = document.getElementById("service").value;
  const today = new Date().toISOString().split("T")[0];

  const existingPdfBytes = await fetch(`pdf/${pdfName}`).then(res => res.arrayBuffer());
  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

  firstPage.drawText(company, {
    x: 140, y: height - 130,
    size: 12, font: font, color: PDFLib.rgb(0, 0, 0),
  });

  firstPage.drawText(today, {
    x: 140, y: height - 155,
    size: 12, font: font, color: PDFLib.rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${company}_견적서_${today}.pdf`;
  link.click();
});
