import type { HTMLAttributes } from "react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText as PayloadRichText } from "@payloadcms/richtext-lexical/react";

type Props = HTMLAttributes<HTMLDivElement> & { data: SerializedEditorState };

export function RichText(props: Props) {
  return <PayloadRichText {...props} />;
}
