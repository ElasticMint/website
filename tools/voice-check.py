# -*- coding: utf-8 -*-
"""
voice-check.py — flags prose in src/blog/*.md that reads as machine-written.

    python tools/voice-check.py                 # all posts, summary table
    python tools/voice-check.py <slug-or-path>  # one post, with the offending lines

Two measures separate Andy's own prose from AI-drafted prose. Measured 14 Sep 2026
across the 7 and 14 September posts (his) and the discovery post (drafted):

    contrast constructions   his 3.6-4.1 per 1000 words    drafted 8.7
    average sentence length  his 18-22 words               drafted 26.1

Contrast constructions are "rather than", "not only", "not X but Y", "whereas",
"instead of", "than to". Draft prose uses them as its main sentence engine, so every
paragraph turns on an antithesis. Note that folding a snap pair ("A. Not B.") into
"A whereas B" trades a flagged tell for an unflagged one and scores worse here.

The third marker, epigrams, has no metric and still needs a read. Lines built to land
are the strongest signal a passage is not his.

Thresholds are guides, not gates. Short sentences are not banned; density is the tell.
"""
import io, os, re, sys, glob

CONTRAST = re.compile(
    r'\brather than\b|\bnot only\b|\bnot\b[^.]{0,45}\bbut\b'
    r'|\bwhereas\b|\bthan to\b|\binstead of\b', re.I)

# short declaratives used as rhetorical beats
SNAP_MAX_WORDS = 6

TARGET_CONTRAST = 5.0      # per 1000 words; his range tops out around 4.1
TARGET_SENTENCE = (16.0, 23.0)


def body(path):
    raw = io.open(path, encoding='utf-8').read()
    parts = raw.split('---', 2)
    text = parts[2] if len(parts) > 2 else raw
    text = re.sub(r'\[([^\]]+)\]\([^)]*\)', r'\1', text)          # strip link syntax
    return '\n'.join(l for l in text.split('\n') if not l.startswith(('<', '#')))


def sentences(text):
    out = []
    for s in re.split(r'(?<=[.!?])\s+', text.replace('\n', ' ')):
        s = s.strip()
        if s and not re.match(r'^\d+\.$', s):                      # list numbering
            out.append(s)
    return out


def measure(path):
    t = body(path)
    words = len(re.findall(r"[A-Za-z0-9'-]+", t))
    contrast = CONTRAST.findall(t)
    sents = [s for s in sentences(t) if len(s.split()) > 2]
    avg = sum(len(s.split()) for s in sents) / float(len(sents)) if sents else 0.0
    snaps = [s for s in sentences(t) if 0 < len(s.split()) <= SNAP_MAX_WORDS]
    per1000 = 1000.0 * len(contrast) / words if words else 0.0
    return dict(words=words, contrast=len(contrast), per1000=per1000,
                avg=avg, snaps=snaps, text=t)


def verdict(m):
    bad = []
    if m['per1000'] > TARGET_CONTRAST:
        bad.append('contrast')
    if not (TARGET_SENTENCE[0] <= m['avg'] <= TARGET_SENTENCE[1]):
        bad.append('sentence length')
    return ('CHECK: ' + ', '.join(bad)) if bad else 'ok'


def detail(path, m):
    print('\n%s' % os.path.basename(path))
    print('  %d words, %d contrast (%.1f per 1000), avg sentence %.1f  ->  %s'
          % (m['words'], m['contrast'], m['per1000'], m['avg'], verdict(m)))
    if m['contrast']:
        print('\n  contrast constructions:')
        for mt in CONTRAST.finditer(m['text']):
            a, b = max(0, mt.start() - 50), min(len(m['text']), mt.end() + 22)
            print('    ...%s...' % m['text'][a:b].replace('\n', ' '))
    if m['snaps']:
        print('\n  short sentences (judgement call, density is the tell):')
        for s in m['snaps']:
            print('    %s' % s)
    print('\n  epigrams are not detectable here. Read for lines built to land.')


def main(argv):
    if argv:
        arg = argv[0]
        path = arg if os.path.exists(arg) else 'src/blog/%s.md' % arg.replace('.md', '')
        if not os.path.exists(path):
            print('not found: %s' % path)
            return 1
        detail(path, measure(path))
        return 0

    paths = sorted(glob.glob('src/blog/*.md'))
    rows = [(p, measure(p)) for p in paths]
    rows.sort(key=lambda r: -r[1]['per1000'])
    print('%-50s %6s %9s %7s   %s' % ('post', 'words', 'per 1000', 'avg', 'verdict'))
    print('-' * 96)
    for p, m in rows:
        print('%-50s %6d %9.1f %7.1f   %s'
              % (os.path.basename(p)[:-3][:50], m['words'], m['per1000'], m['avg'], verdict(m)))
    print('\nAndy: 3.6-4.1 per 1000, 18-22 word sentences. Run with a slug for the lines.')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
