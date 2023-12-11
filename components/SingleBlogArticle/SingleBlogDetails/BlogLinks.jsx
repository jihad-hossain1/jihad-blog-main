const BlogLinks = ({ blog_links }) => {
  return (
    <>
      {blog_links && (
        <div className="flex flex-col gap-1 text-sm mt-3">
          <h4 className="font-semibold">Source From: </h4>
          <a
            target="_blank"
            href={blog_links?.linkUrl}
            className="text-blue-600 break-all"
          >
            {blog_links?.linkUrl}
          </a>
          {blog_links?.links?.map((link, index) => (
            <a className="text-blue-600 break-all" href={link} key={index}>
              {link}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default BlogLinks;
