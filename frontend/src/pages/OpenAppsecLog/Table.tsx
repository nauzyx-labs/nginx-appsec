import { useTable } from "@tanstack/react-table";
import { useMemo } from "react";
import type { OpenAppsecLogEntry } from "src/api/backend";
import { features } from "src/components/Table/features";
import { TableLayout } from "src/components/Table/TableLayout";
import { buildColumns, type ColumnVariant } from "./columns";

interface Props {
	data: OpenAppsecLogEntry[];
	isFetching?: boolean;
	variant: ColumnVariant;
	onSelectRow: (entry: OpenAppsecLogEntry) => void;
}

export default function Table({ data, isFetching, variant, onSelectRow }: Props) {
	const columns = useMemo(
		() => buildColumns({ variant, onSelectRow }),
		[variant, onSelectRow],
	);

	const tableInstance = useTable({
		features,
		columns,
		data,
		meta: {
			isFetching,
		},
		enableSortingRemoval: false,
	});

	return <TableLayout tableInstance={tableInstance} />;
}
