import methodOverride from 'method-override';

const getOverrideMethod = (req) => {
  if (req.body?._method) return req.body._method;

  const query = new URL(req.url, 'http://localhost').searchParams;
  return query.get('_method') ?? undefined;
};

export default methodOverride(getOverrideMethod);
