import { describe, expect, it } from "vitest";
import en from "./src/en.json";
import et from "./src/et.json";

const english = en as Record<string, { defaultMessage: string }>;
const estonian = et as Record<string, { defaultMessage: string }>;

// Brand names, codes and ICU-only strings can stay the same as English.
// open-appsec UI strings are English-fallback across every non-English locale
// (see docs/superpowers/plans/2026-05-13-npm-2.14-port.md); they're excluded
// from the "must be translated" check the same way brand names are.
const allowedIdentical = new Set([
	"certificates.key-type-ecdsa",
	"certificates.key-type-rsa",
	"column.ssl",
	"lets-encrypt",
	"object.actions-title",
	"streams.tcp",
	"streams.udp",
	"login.protected-by-open-appsec",
	"menu.openAppsecLog",
	"openappsec-log.col.action",
	"openappsec-log.col.details",
	"openappsec-log.col.event-name",
	"openappsec-log.col.host",
	"openappsec-log.col.incident-type",
	"openappsec-log.col.matched-location",
	"openappsec-log.col.matched-parameter",
	"openappsec-log.col.matched-sample",
	"openappsec-log.col.method",
	"openappsec-log.col.service",
	"openappsec-log.col.severity",
	"openappsec-log.col.source-ip",
	"openappsec-log.col.time",
	"openappsec-log.col.uri",
	"openappsec-log.details.raw",
	"openappsec-log.details.title",
	"openappsec-log.tab.all",
	"openappsec-log.tab.detailed",
	"openappsec-log.tab.important",
	"openappsec-log.tab.notifications",
	"openappsec-log.title",
	"proxy-hosts.form.openappsec.confidence",
	"proxy-hosts.form.openappsec.confidence.critical",
	"proxy-hosts.form.openappsec.confidence.high",
	"proxy-hosts.form.openappsec.confidence.low",
	"proxy-hosts.form.openappsec.confidence.medium",
	"proxy-hosts.form.openappsec.enable",
	"proxy-hosts.form.openappsec.mode",
	"proxy-hosts.form.openappsec.mode.detect-learn",
	"proxy-hosts.form.openappsec.mode.inactive",
	"proxy-hosts.form.openappsec.mode.prevent-learn",
	"proxy-hosts.form.openappsec.tab",
	"settings.openappsec.local-policy",
	"settings.openappsec.local-policy.description",
	"settings.openappsec.save",
	"settings.openappsec.title",
]);

describe("Estonian UI locale", () => {
	it("covers every English UI key", () => {
		const missing = Object.keys(english).filter((key) => !(key in estonian));
		expect(missing).toEqual([]);
	});

	it("does not add keys that are missing from English", () => {
		const extra = Object.keys(estonian).filter((key) => !(key in english));
		expect(extra).toEqual([]);
	});

	it("is translated, not an English copy", () => {
		const identical = Object.keys(english).filter(
			(key) => estonian[key]?.defaultMessage === english[key]?.defaultMessage,
		);
		const unexpected = identical.filter((key) => !allowedIdentical.has(key));
		expect(unexpected).toEqual([]);
	});

	it("keeps ICU data placeholders from English strings", () => {
		const argNames = [
			"count",
			"object",
			"objects",
			"id",
			"date",
			"users",
			"rules",
			"max",
			"min",
			"domain",
			"code",
			"latestVersion",
			"name",
		];
		const usedArgs = (message: string) => argNames.filter((name) => message.includes(`{${name}`));
		const broken: string[] = [];

		for (const key of Object.keys(english)) {
			const expected = usedArgs(english[key].defaultMessage).join(",");
			const actual = usedArgs(estonian[key]?.defaultMessage ?? "").join(",");
			if (expected !== actual) {
				broken.push(`${key}: expected {${expected}} got {${actual}}`);
			}
		}

		expect(broken).toEqual([]);
	});
});
