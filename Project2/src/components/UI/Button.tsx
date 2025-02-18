import { ComponentPropsWithoutRef } from "react";

type ButtonPrors = ComponentPropsWithoutRef<"button"> & {
  href?: never;
};
type anchorPrors = ComponentPropsWithoutRef<"a"> & {
  href?: string;
};

function isAnchorProps(props: ButtonPrors | anchorPrors): props is anchorPrors {
  return "href" in props;
}

export default function Button(props: ButtonPrors | anchorPrors) {
  if (isAnchorProps(props)) {
    return <a className="button" {...props}></a>;
  }

  return <button className="button" {...props}></button>;
}
