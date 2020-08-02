export type Post = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  _embedded: Record<string, unknown> | boolean;
};

export type Category = {
  cat_name: string;
  category_count: string;
  term_id: number;
};

export type Tag = {
  name: string;
  count: string;
  term_id: number;
};

export type MediaDetails = {
  media_details: {
    file: string;
  };
};

export type FilteredBy = {
  categories: Category[] | [];
  tags: Tag[] | [];
};

export type NewPostsAndCount = {
  newPosts: Post[] | [];
  newPages: number;
};
