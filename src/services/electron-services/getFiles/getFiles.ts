import fs from 'fs'

export const getSSLFile = (sslPath: SSLPath): SSLContent | undefined => {
  const { ca, cert, key } = sslPath
  const res: SSLContent = {
    ca: ca !== '' ? [fs.readFileSync(ca)] : undefined,
    cert: cert !== '' ? fs.readFileSync(cert) : undefined,
    key: key !== '' ? fs.readFileSync(key) : undefined,
  }
  return res
}

export default {}
