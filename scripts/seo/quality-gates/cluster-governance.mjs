function countBy(items, keySelector) {
  const counts = new Map();

  items.forEach((item) => {
    const key = keySelector(item);
    if (!key) return;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  return counts;
}

export function validateSeoClusterGovernance({
  industries,
  cityLandings,
  landingExamples,
  demos,
  comparatives,
  blog,
}) {
  const issues = [];

  const industriesBySlug = new Map(industries.map((entry) => [entry.slug, entry]));
  const demosByPublicSlug = new Map(demos.map((entry) => [entry.publicSlug, entry]));
  const examplesByIndustrySlug = countBy(landingExamples, (entry) => entry.industrySlug);
  const citiesByIndustrySlug = countBy(cityLandings, (entry) => entry.niche?.industrySlug);

  industries.forEach((industry) => {
    if ((examplesByIndustrySlug.get(industry.slug) ?? 0) === 0) {
      issues.push(`industry-missing-example:${industry.slug}`);
    }

    if ((citiesByIndustrySlug.get(industry.slug) ?? 0) === 0) {
      issues.push(`industry-missing-city-coverage:${industry.slug}`);
    }

    if (industry.demo && !demosByPublicSlug.has(industry.demo)) {
      issues.push(`industry-missing-demo:${industry.slug}->${industry.demo}`);
    }
  });

  landingExamples.forEach((entry) => {
    if (!industriesBySlug.has(entry.industrySlug)) {
      issues.push(`example-orphan-industry:${entry.slug}->${entry.industrySlug}`);
    }

    if (entry.demo && !demosByPublicSlug.has(entry.demo)) {
      issues.push(`example-missing-demo:${entry.slug}->${entry.demo}`);
    }
  });

  cityLandings.forEach((entry) => {
    const industrySlug = entry.niche?.industrySlug;
    if (!industrySlug || !industriesBySlug.has(industrySlug)) {
      issues.push(`city-orphan-industry:${entry.slug}->${industrySlug ?? 'missing'}`);
    }
  });

  if (comparatives.length === 0) {
    issues.push('comparatives-empty');
  }

  if (blog.length === 0) {
    issues.push('blog-empty');
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}
