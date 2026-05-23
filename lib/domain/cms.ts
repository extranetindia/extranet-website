export type CmsContentStatus = "draft" | "published" | "scheduled";

export type CmsBlockType =
  | "hero"
  | "banner"
  | "homepage_section"
  | "offer"
  | "footer_note";

/** CMS content block — editable from admin, served to marketing site later */
export type CmsContentBlock = {
  id: string;
  type: CmsBlockType;
  key: string;
  title: string;
  status: CmsContentStatus;
  locale: string;
  updatedAt: string;
};

export type CmsModuleDefinition = {
  id: string;
  type: CmsBlockType;
  label: string;
  description: string;
  route: string;
  status: "ready" | "planned";
};
