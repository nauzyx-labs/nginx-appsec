import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import type { OpenAppsecLogEntry } from "src/api/backend";
import { DateFormatter, SeverityFormatter } from "src/components";
import type { Features } from "src/components/Table/features";
import { intl, T } from "src/locale";

export type ColumnVariant = "summary" | "detailed";

interface BuildColumnsOptions {
	variant: ColumnVariant;
	onSelectRow: (entry: OpenAppsecLogEntry) => void;
}

const columnHelper = createColumnHelper<Features, OpenAppsecLogEntry>();

const renderText = (value: unknown): React.ReactNode => {
	if (value === null || value === undefined || value === "") {
		return <span className="text-secondary">—</span>;
	}
	return String(value);
};

const detailsButton = (
	entry: OpenAppsecLogEntry,
	onSelectRow: (entry: OpenAppsecLogEntry) => void,
) => (
	<button
		type="button"
		className="btn btn-action btn-sm px-1"
		onClick={(e) => {
			e.preventDefault();
			onSelectRow(entry);
		}}
	>
		<T id="openappsec-log.col.details" />
	</button>
);

export function buildColumns({
	variant,
	onSelectRow,
}: BuildColumnsOptions): ColumnDef<Features, OpenAppsecLogEntry>[] {
	const summary: ColumnDef<Features, OpenAppsecLogEntry>[] = [
		columnHelper.accessor((row: any) => row.eventTime, {
			id: "eventTime",
			header: intl.formatMessage({ id: "openappsec-log.col.time" }),
			cell: (info: any) => {
				const value = info.getValue() as string | undefined;
				return value ? <DateFormatter value={value} /> : renderText(value);
			},
			meta: { className: "text-nowrap" },
		}),
		columnHelper.accessor((row: any) => row.eventSeverity, {
			id: "eventSeverity",
			header: intl.formatMessage({ id: "openappsec-log.col.severity" }),
			cell: (info: any) => <SeverityFormatter value={info.getValue() as string} />,
			meta: { className: "text-nowrap" },
		}),
		columnHelper.accessor((row: any) => row.serviceName, {
			id: "serviceName",
			header: intl.formatMessage({ id: "openappsec-log.col.service" }),
			cell: (info: any) => renderText(info.getValue()),
		}),
		columnHelper.accessor((row: any) => row.sourceIP, {
			id: "sourceIP",
			header: intl.formatMessage({ id: "openappsec-log.col.source-ip" }),
			cell: (info: any) => renderText(info.getValue()),
			meta: { className: "text-nowrap" },
		}),
		columnHelper.accessor((row: any) => row.httpHostName, {
			id: "httpHostName",
			header: intl.formatMessage({ id: "openappsec-log.col.host" }),
			cell: (info: any) => renderText(info.getValue()),
		}),
		columnHelper.accessor((row: any) => row.httpMethod, {
			id: "httpMethod",
			header: intl.formatMessage({ id: "openappsec-log.col.method" }),
			cell: (info: any) => renderText(info.getValue()),
			meta: { className: "text-nowrap" },
		}),
		columnHelper.accessor((row: any) => row.httpUriPath, {
			id: "httpUriPath",
			header: intl.formatMessage({ id: "openappsec-log.col.uri" }),
			cell: (info: any) => renderText(info.getValue()),
		}),
		columnHelper.accessor((row: any) => row.securityAction, {
			id: "securityAction",
			header: intl.formatMessage({ id: "openappsec-log.col.action" }),
			cell: (info: any) => renderText(info.getValue()),
			meta: { className: "text-nowrap" },
		}),
	];

	const detailedExtras: ColumnDef<Features, OpenAppsecLogEntry>[] = [
		columnHelper.accessor((row: any) => row.eventName, {
			id: "eventName",
			header: intl.formatMessage({ id: "openappsec-log.col.event-name" }),
			cell: (info: any) => renderText(info.getValue()),
		}),
		columnHelper.accessor((row: any) => row.waapIncidentType, {
			id: "waapIncidentType",
			header: intl.formatMessage({ id: "openappsec-log.col.incident-type" }),
			cell: (info: any) => renderText(info.getValue()),
		}),
		columnHelper.accessor((row: any) => row.matchedLocation, {
			id: "matchedLocation",
			header: intl.formatMessage({ id: "openappsec-log.col.matched-location" }),
			cell: (info: any) => renderText(info.getValue()),
		}),
		columnHelper.accessor((row: any) => row.matchedParameter, {
			id: "matchedParameter",
			header: intl.formatMessage({ id: "openappsec-log.col.matched-parameter" }),
			cell: (info: any) => renderText(info.getValue()),
		}),
		columnHelper.accessor((row: any) => row.matchedSample, {
			id: "matchedSample",
			header: intl.formatMessage({ id: "openappsec-log.col.matched-sample" }),
			cell: (info: any) => renderText(info.getValue()),
		}),
	];

	const detailsAction: ColumnDef<Features, OpenAppsecLogEntry> = columnHelper.display({
		id: "details",
		header: () => null,
		cell: (info: any) => detailsButton(info.row.original, onSelectRow),
		meta: { className: "text-end w-1" },
	});

	return variant === "detailed"
		? [...summary, ...detailedExtras, detailsAction]
		: [...summary, detailsAction];
}
