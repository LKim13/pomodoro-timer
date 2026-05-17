import { protocol, net } from 'electron'
import { join } from 'path'

export function registerSoundProtocol(): void {
  protocol.handle('sound', (request) => {
    const fileName = request.url.replace('sound://', '')
    const filePath = join(__dirname, '../../resources', fileName)
    return net.fetch(`file://${filePath}`)
  })
}