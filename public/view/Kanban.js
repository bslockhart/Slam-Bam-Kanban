class Kanban {
	constructor(root) {
		this.root = root;

		Kanban.columns().forEach(column => {
			const columnView = new Column(column.id, column.title);

			this.root.appendChild(columnView.elements.root);
		});
	}

	static columns() {
		return  [
			{
				id: 1,
				title: "Wishlist"
			},
			{
				id: 2,
				title: "Applied"
			},
			{
				id: 3,
				title: "Interview"
			},
			{
				id: 4,
				title: "Offer"
			},
		];
	}
}