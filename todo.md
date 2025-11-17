# todo

## half / unimplemented features
- [ ] project conflict resolution
- [ ] view panels
    - [ ] option to choose which side panels go on
    - [ ] detachable panels?
    - [ ] save view panel settings that aren't in project to user settings, stored in browser
- [ ] saving
    - [ ] autosave
    - [ ] save to filesystem without dialog
- [ ] clips
    - [ ] location
    - [ ] length
    - [ ] copy/paste
    - [ ] drag & drop from media pool
    - [ ] trimming
    - [ ] splitting
    - [ ] audio
        - [ ] audio ungrouping
        - [ ] simple fade in / out (like kdenlive)
        - [ ] envelope editor
            - [ ] zig-zag
            - [ ] splines?
    - [ ] video
        - [ ] video / audio ungrouping
    - [ ] midi
        - [ ] piano roll editor
        - [ ] software instrumentation controllable with keyboard
        - [ ] change soundfont
- [ ] exporting
- [ ] media pool
    - [ ] import from url
    - [ ] media preview
         - [ ] video preview
             - [ ] metadata
             - [ ] audio preview
         - [ ] audio preview
             - [ ] spectogram
             - [ ] waveform
             - [ ] metadata
         - [ ] image preview
             - [ ] metadata
         - [ ] midi preview
             - [ ] metadata
             - [ ] piano roll preview
             - [ ] soundfont preview
- [ ] settings
    - [ ] keyboard shortcuts
        - [ ] changing
        - [ ] keymaps to choose from (e.g. logic pro, audacity etc.)

## behavioural & organizational bugs
- [ ] timecrash library files in src/lib/timecrash should be moved to src/lib, as now that timecrash has its own repo, this is redundant

## unimplemented visual polish & bugs
- [ ] bottom border of a track doesn't pixel match with the top border of a newly added track
- [ ] media pool content gets bunched up when resizing it
- [ ] playhead arrow shouldn't be a triangle, but a triangle with it's straight side extruded upwards, this kind of shape: ⌫, but rotated
- [ ] clip overlap opacity
- [ ] icons in command runner (BLOCKED by lucide bug)
