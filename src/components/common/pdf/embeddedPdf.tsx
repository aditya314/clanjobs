import { Center } from '@chakra-ui/react';

export function EmbeddedPdf({ pdf }) {
  return (
    <>
      <Center width="100%" height="80vh">
        <embed src={pdf} style={{ width: '100%', height: '100%' }} type="application/pdf" />
      </Center>
    </>
  );
}

/**
 Alternative References
 <embed
 style={{
      width: '100%',
      height: '100%',
    }}
 type=" application/pdf"
 src={pdf}
 />
 <iframe src={pdf} title="SOME_TITLE" width="100%" height="150%" />
 <object data={pdf} type="application/pdf" width="100%" height="100%">
 <p>
 Your web browser doesnot have a PDF plugin. Instead you can
 <a href={pdfs}>click here to download the PDF file.</a>
 </p>
 </object>
 **/
