import { describe, it, expect, vi } from 'vitest'
import { withInstall, makeInstaller } from '../../lib/utils/install'

describe('withInstall', () => {
  it('should add install method and extra properties', () => {
    const comp: any = { name: 'TestComp' }
    const extra = { ExtraComp: { name: 'ExtraComp' } }
    const app: any = { component: vi.fn() }

    const installed = withInstall(comp, extra)
    expect(typeof installed.install).toBe('function')
    expect(installed.ExtraComp).toBe(extra.ExtraComp)

    installed.install(app)
    expect(app.component).toHaveBeenCalledWith('TestComp', comp)
    expect(app.component).toHaveBeenCalledWith('ExtraComp', extra.ExtraComp)
  })

  it('should work without extra', () => {
    const comp: any = { name: 'TestComp' }
    const app: any = { component: vi.fn() }

    const installed = withInstall(comp)
    expect(typeof installed.install).toBe('function')
    expect((installed as any).ExtraComp).toBeUndefined()

    installed.install(app)
    expect(app.component).toHaveBeenCalledWith('TestComp', comp)
  })
})

describe('makeInstaller', () => {
  it('should return an installer with version', () => {
    const plugin = { install: vi.fn() }
    const app: any = { use: vi.fn() }
    const installer = makeInstaller([plugin as any])

    expect(typeof installer.install).toBe('function')
    expect(installer.version).toBeDefined()

    installer.install(app)
    expect(app.use).toHaveBeenCalledWith(plugin)
  })

  it('should work with empty components', () => {
    const app: any = { use: vi.fn() }
    const installer = makeInstaller()
    installer.install(app)
    expect(app.use).not.toHaveBeenCalled()
  })
})
