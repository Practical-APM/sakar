"use client";

const REPOS = [
  {
    name: "Covalynce",
    href: "https://github.com/Practical-APM/Covalynce",
    lang: "TypeScript",
    desc: "AI Contextual Intelligence Suite",
  },
  {
    name: "Beacon",
    href: "https://github.com/Practical-APM/Beacon",
    lang: "TypeScript",
    desc: "Signal Telemetry Engine",
  },
  {
    name: "Syftin",
    href: "https://github.com/Practical-APM/Syftin",
    lang: "TypeScript",
    desc: "Product Curation Build",
  },
  {
    name: "sakar",
    href: "https://github.com/Practical-APM/sakar",
    lang: "TypeScript",
    desc: "Personal Monorepo & Core Specs",
  },
];

/** GitHub profile + public repos for Practical-APM. */
export function GithubSection({ onSelect }: { onSelect?: () => void }) {
  return (
    <div className="gh-panel">
      <div className="gh-panel__head">
        <div className="gh-panel__avatar" aria-hidden>
          <span>{"</>"}</span>
        </div>
        <div>
          <p className="gh-panel__kicker">GITHUB ARCHIVE</p>
          <a
            href="https://github.com/Practical-APM"
            className="gh-panel__user"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onSelect}
          >
            @Practical-APM
          </a>
          <p className="gh-panel__bio">Working on theories & production specs</p>
        </div>
        <a
          href="https://github.com/Practical-APM"
          className="nes-btn is-primary gh-panel__cta"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSelect}
        >
          Open profile ↗
        </a>
      </div>

      <ul className="gh-repos">
        {REPOS.map((repo, i) => (
          <li key={repo.name} style={{ ["--gh-delay" as string]: `${i * 70}ms` }}>
            <a
              href={repo.href}
              className="gh-repo"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSelect}
            >
              <span className="gh-repo__icon" aria-hidden>
                ⌂
              </span>
              <span className="gh-repo__body">
                <strong>{repo.name}</strong>
                <span>{repo.lang} · {repo.desc}</span>
              </span>
              <span className="gh-repo__arrow" aria-hidden>
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
