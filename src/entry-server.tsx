// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang="en">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
					<link rel="icon alternate" href="/favicon.png" type="image/png" />
					<title>にじさんじ Streams iCal</title>
					<meta name="title" content="にじさんじ Streams iCal" />
					<meta name="description" content="にじさんじライバーの配信予定のカレンダーファイル(iCal形式)を生成します | 特定のライバーのみを選択して生成することも可能です" />

					{/* Open Graph Meta Tags */}
					<meta property="og:type" content="website" />
					<meta property="og:url" content="https://nijisanji-streams-ics.pages.dev" />
					<meta property="og:title" content="にじさんじ Streams iCal" />
					<meta property="og:description" content="にじさんじライバーの配信予定のカレンダーファイル(iCal形式)を生成します | 特定のライバーのみを選択して生成することも可能です" />
					<meta property="og:image" content="https://nijisanji-streams-ics.pages.dev/OGP.webp" />

					{/* Twitter */}
					<meta property="twitter:card" content="summary" />
					<meta property="twitter:url" content="https://nijisanji-streams-ics.pages.dev" />
					<meta property="twitter:title" content="にじさんじ Streams iCal" />
					<meta property="twitter:description" content="にじさんじライバーの配信予定のカレンダーファイル(iCal形式)を生成します | 特定のライバーのみを選択して生成することも可能です" />
					<meta property="twitter:image" content="https://nijisanji-streams-ics.pages.dev/OGP.webp" />
					{assets}
				</head>
				<body>
					<div id="app">{children}</div>
					{scripts}
				</body>
			</html>
		)}
	/>
));
