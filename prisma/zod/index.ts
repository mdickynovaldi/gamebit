import { z } from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// DECIMAL
//------------------------------------------------------

export const DecimalJsLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
  toFixed: z.function(z.tuple([]), z.string()),
})

export const DECIMAL_STRING_REGEX = /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\.[01]+)?(?:[pP][-+]?\d+)?|0[oO][0-7]+(?:\.[0-7]+)?(?:[pP][-+]?\d+)?|0[xX][\da-fA-F]+(?:\.[\da-fA-F]+)?(?:[pP][-+]?\d+)?|(?:\d+|\d*\.\d+)(?:[eE][-+]?\d+)?))$/;

export const isValidDecimalInput =
  (v?: null | string | number | Prisma.DecimalJsLike): v is string | number | Prisma.DecimalJsLike => {
    if (v === undefined || v === null) return false;
    return (
      (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||
      (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
      typeof v === 'number'
    )
  };

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const GameScalarFieldEnumSchema = z.enum(['id','slug','name','price','description','releaseDate','imageUrl','rating','createdAt','updatedAt']);

export const DeveloperScalarFieldEnumSchema = z.enum(['id','slug','name']);

export const PublisherScalarFieldEnumSchema = z.enum(['id','slug','name']);

export const PlatformScalarFieldEnumSchema = z.enum(['id','slug','name']);

export const GenreScalarFieldEnumSchema = z.enum(['id','slug','name']);

export const TagScalarFieldEnumSchema = z.enum(['id','slug','name']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// GAME SCHEMA
/////////////////////////////////////////

export const GameSchema = z.object({
  id: z.string().cuid(),
  slug: z.string(),
  name: z.string(),
  price: z.instanceof(Prisma.Decimal, { message: "Field 'price' must be a Decimal. Location: ['Models', 'Game']"}),
  description: z.string().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Game = z.infer<typeof GameSchema>

/////////////////////////////////////////
// DEVELOPER SCHEMA
/////////////////////////////////////////

export const DeveloperSchema = z.object({
  id: z.string().cuid(),
  slug: z.string(),
  name: z.string(),
})

export type Developer = z.infer<typeof DeveloperSchema>

/////////////////////////////////////////
// PUBLISHER SCHEMA
/////////////////////////////////////////

export const PublisherSchema = z.object({
  id: z.string().cuid(),
  slug: z.string(),
  name: z.string(),
})

export type Publisher = z.infer<typeof PublisherSchema>

/////////////////////////////////////////
// PLATFORM SCHEMA
/////////////////////////////////////////

export const PlatformSchema = z.object({
  id: z.string().cuid(),
  slug: z.string(),
  name: z.string(),
})

export type Platform = z.infer<typeof PlatformSchema>

/////////////////////////////////////////
// GENRE SCHEMA
/////////////////////////////////////////

export const GenreSchema = z.object({
  id: z.string().cuid(),
  slug: z.string(),
  name: z.string(),
})

export type Genre = z.infer<typeof GenreSchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string().cuid(),
  slug: z.string(),
  name: z.string(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// GAME
//------------------------------------------------------

export const GameIncludeSchema: z.ZodType<Prisma.GameInclude> = z.object({
  developers: z.union([z.boolean(),z.lazy(() => DeveloperFindManyArgsSchema)]).optional(),
  publishers: z.union([z.boolean(),z.lazy(() => PublisherFindManyArgsSchema)]).optional(),
  platforms: z.union([z.boolean(),z.lazy(() => PlatformFindManyArgsSchema)]).optional(),
  genres: z.union([z.boolean(),z.lazy(() => GenreFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GameCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GameArgsSchema: z.ZodType<Prisma.GameDefaultArgs> = z.object({
  select: z.lazy(() => GameSelectSchema).optional(),
  include: z.lazy(() => GameIncludeSchema).optional(),
}).strict();

export const GameCountOutputTypeArgsSchema: z.ZodType<Prisma.GameCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GameCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GameCountOutputTypeSelectSchema: z.ZodType<Prisma.GameCountOutputTypeSelect> = z.object({
  developers: z.boolean().optional(),
  publishers: z.boolean().optional(),
  platforms: z.boolean().optional(),
  genres: z.boolean().optional(),
  tags: z.boolean().optional(),
}).strict();

export const GameSelectSchema: z.ZodType<Prisma.GameSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  name: z.boolean().optional(),
  price: z.boolean().optional(),
  description: z.boolean().optional(),
  releaseDate: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  rating: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  developers: z.union([z.boolean(),z.lazy(() => DeveloperFindManyArgsSchema)]).optional(),
  publishers: z.union([z.boolean(),z.lazy(() => PublisherFindManyArgsSchema)]).optional(),
  platforms: z.union([z.boolean(),z.lazy(() => PlatformFindManyArgsSchema)]).optional(),
  genres: z.union([z.boolean(),z.lazy(() => GenreFindManyArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GameCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DEVELOPER
//------------------------------------------------------

export const DeveloperIncludeSchema: z.ZodType<Prisma.DeveloperInclude> = z.object({
  games: z.union([z.boolean(),z.lazy(() => GameFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DeveloperCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DeveloperArgsSchema: z.ZodType<Prisma.DeveloperDefaultArgs> = z.object({
  select: z.lazy(() => DeveloperSelectSchema).optional(),
  include: z.lazy(() => DeveloperIncludeSchema).optional(),
}).strict();

export const DeveloperCountOutputTypeArgsSchema: z.ZodType<Prisma.DeveloperCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DeveloperCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DeveloperCountOutputTypeSelectSchema: z.ZodType<Prisma.DeveloperCountOutputTypeSelect> = z.object({
  games: z.boolean().optional(),
}).strict();

export const DeveloperSelectSchema: z.ZodType<Prisma.DeveloperSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  name: z.boolean().optional(),
  games: z.union([z.boolean(),z.lazy(() => GameFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DeveloperCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PUBLISHER
//------------------------------------------------------

export const PublisherIncludeSchema: z.ZodType<Prisma.PublisherInclude> = z.object({
  games: z.union([z.boolean(),z.lazy(() => GameFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PublisherCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PublisherArgsSchema: z.ZodType<Prisma.PublisherDefaultArgs> = z.object({
  select: z.lazy(() => PublisherSelectSchema).optional(),
  include: z.lazy(() => PublisherIncludeSchema).optional(),
}).strict();

export const PublisherCountOutputTypeArgsSchema: z.ZodType<Prisma.PublisherCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PublisherCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PublisherCountOutputTypeSelectSchema: z.ZodType<Prisma.PublisherCountOutputTypeSelect> = z.object({
  games: z.boolean().optional(),
}).strict();

export const PublisherSelectSchema: z.ZodType<Prisma.PublisherSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  name: z.boolean().optional(),
  games: z.union([z.boolean(),z.lazy(() => GameFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PublisherCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PLATFORM
//------------------------------------------------------

export const PlatformIncludeSchema: z.ZodType<Prisma.PlatformInclude> = z.object({
  games: z.union([z.boolean(),z.lazy(() => GameFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PlatformCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PlatformArgsSchema: z.ZodType<Prisma.PlatformDefaultArgs> = z.object({
  select: z.lazy(() => PlatformSelectSchema).optional(),
  include: z.lazy(() => PlatformIncludeSchema).optional(),
}).strict();

export const PlatformCountOutputTypeArgsSchema: z.ZodType<Prisma.PlatformCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PlatformCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PlatformCountOutputTypeSelectSchema: z.ZodType<Prisma.PlatformCountOutputTypeSelect> = z.object({
  games: z.boolean().optional(),
}).strict();

export const PlatformSelectSchema: z.ZodType<Prisma.PlatformSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  name: z.boolean().optional(),
  games: z.union([z.boolean(),z.lazy(() => GameFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PlatformCountOutputTypeArgsSchema)]).optional(),
}).strict()

// GENRE
//------------------------------------------------------

export const GenreIncludeSchema: z.ZodType<Prisma.GenreInclude> = z.object({
  games: z.union([z.boolean(),z.lazy(() => GameFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GenreCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GenreArgsSchema: z.ZodType<Prisma.GenreDefaultArgs> = z.object({
  select: z.lazy(() => GenreSelectSchema).optional(),
  include: z.lazy(() => GenreIncludeSchema).optional(),
}).strict();

export const GenreCountOutputTypeArgsSchema: z.ZodType<Prisma.GenreCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GenreCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GenreCountOutputTypeSelectSchema: z.ZodType<Prisma.GenreCountOutputTypeSelect> = z.object({
  games: z.boolean().optional(),
}).strict();

export const GenreSelectSchema: z.ZodType<Prisma.GenreSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  name: z.boolean().optional(),
  games: z.union([z.boolean(),z.lazy(() => GameFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GenreCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  games: z.union([z.boolean(),z.lazy(() => GameFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  games: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  name: z.boolean().optional(),
  games: z.union([z.boolean(),z.lazy(() => GameFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const GameWhereInputSchema: z.ZodType<Prisma.GameWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GameWhereInputSchema),z.lazy(() => GameWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameWhereInputSchema),z.lazy(() => GameWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  releaseDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  developers: z.lazy(() => DeveloperListRelationFilterSchema).optional(),
  publishers: z.lazy(() => PublisherListRelationFilterSchema).optional(),
  platforms: z.lazy(() => PlatformListRelationFilterSchema).optional(),
  genres: z.lazy(() => GenreListRelationFilterSchema).optional(),
  tags: z.lazy(() => TagListRelationFilterSchema).optional()
}).strict();

export const GameOrderByWithRelationInputSchema: z.ZodType<Prisma.GameOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  developers: z.lazy(() => DeveloperOrderByRelationAggregateInputSchema).optional(),
  publishers: z.lazy(() => PublisherOrderByRelationAggregateInputSchema).optional(),
  platforms: z.lazy(() => PlatformOrderByRelationAggregateInputSchema).optional(),
  genres: z.lazy(() => GenreOrderByRelationAggregateInputSchema).optional(),
  tags: z.lazy(() => TagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const GameWhereUniqueInputSchema: z.ZodType<Prisma.GameWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    slug: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => GameWhereInputSchema),z.lazy(() => GameWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameWhereInputSchema),z.lazy(() => GameWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  releaseDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  developers: z.lazy(() => DeveloperListRelationFilterSchema).optional(),
  publishers: z.lazy(() => PublisherListRelationFilterSchema).optional(),
  platforms: z.lazy(() => PlatformListRelationFilterSchema).optional(),
  genres: z.lazy(() => GenreListRelationFilterSchema).optional(),
  tags: z.lazy(() => TagListRelationFilterSchema).optional()
}).strict());

export const GameOrderByWithAggregationInputSchema: z.ZodType<Prisma.GameOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GameCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => GameAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GameMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GameMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => GameSumOrderByAggregateInputSchema).optional()
}).strict();

export const GameScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GameScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GameScalarWhereWithAggregatesInputSchema),z.lazy(() => GameScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameScalarWhereWithAggregatesInputSchema),z.lazy(() => GameScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => DecimalWithAggregatesFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  releaseDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DeveloperWhereInputSchema: z.ZodType<Prisma.DeveloperWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DeveloperWhereInputSchema),z.lazy(() => DeveloperWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeveloperWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeveloperWhereInputSchema),z.lazy(() => DeveloperWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  games: z.lazy(() => GameListRelationFilterSchema).optional()
}).strict();

export const DeveloperOrderByWithRelationInputSchema: z.ZodType<Prisma.DeveloperOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  games: z.lazy(() => GameOrderByRelationAggregateInputSchema).optional()
}).strict();

export const DeveloperWhereUniqueInputSchema: z.ZodType<Prisma.DeveloperWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    slug: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => DeveloperWhereInputSchema),z.lazy(() => DeveloperWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeveloperWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeveloperWhereInputSchema),z.lazy(() => DeveloperWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  games: z.lazy(() => GameListRelationFilterSchema).optional()
}).strict());

export const DeveloperOrderByWithAggregationInputSchema: z.ZodType<Prisma.DeveloperOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DeveloperCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DeveloperMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DeveloperMinOrderByAggregateInputSchema).optional()
}).strict();

export const DeveloperScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DeveloperScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DeveloperScalarWhereWithAggregatesInputSchema),z.lazy(() => DeveloperScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeveloperScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeveloperScalarWhereWithAggregatesInputSchema),z.lazy(() => DeveloperScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PublisherWhereInputSchema: z.ZodType<Prisma.PublisherWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PublisherWhereInputSchema),z.lazy(() => PublisherWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PublisherWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PublisherWhereInputSchema),z.lazy(() => PublisherWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  games: z.lazy(() => GameListRelationFilterSchema).optional()
}).strict();

export const PublisherOrderByWithRelationInputSchema: z.ZodType<Prisma.PublisherOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  games: z.lazy(() => GameOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PublisherWhereUniqueInputSchema: z.ZodType<Prisma.PublisherWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    slug: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => PublisherWhereInputSchema),z.lazy(() => PublisherWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PublisherWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PublisherWhereInputSchema),z.lazy(() => PublisherWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  games: z.lazy(() => GameListRelationFilterSchema).optional()
}).strict());

export const PublisherOrderByWithAggregationInputSchema: z.ZodType<Prisma.PublisherOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PublisherCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PublisherMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PublisherMinOrderByAggregateInputSchema).optional()
}).strict();

export const PublisherScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PublisherScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PublisherScalarWhereWithAggregatesInputSchema),z.lazy(() => PublisherScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PublisherScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PublisherScalarWhereWithAggregatesInputSchema),z.lazy(() => PublisherScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PlatformWhereInputSchema: z.ZodType<Prisma.PlatformWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlatformWhereInputSchema),z.lazy(() => PlatformWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlatformWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlatformWhereInputSchema),z.lazy(() => PlatformWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  games: z.lazy(() => GameListRelationFilterSchema).optional()
}).strict();

export const PlatformOrderByWithRelationInputSchema: z.ZodType<Prisma.PlatformOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  games: z.lazy(() => GameOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PlatformWhereUniqueInputSchema: z.ZodType<Prisma.PlatformWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    slug: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => PlatformWhereInputSchema),z.lazy(() => PlatformWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlatformWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlatformWhereInputSchema),z.lazy(() => PlatformWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  games: z.lazy(() => GameListRelationFilterSchema).optional()
}).strict());

export const PlatformOrderByWithAggregationInputSchema: z.ZodType<Prisma.PlatformOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PlatformCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PlatformMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PlatformMinOrderByAggregateInputSchema).optional()
}).strict();

export const PlatformScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PlatformScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PlatformScalarWhereWithAggregatesInputSchema),z.lazy(() => PlatformScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlatformScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlatformScalarWhereWithAggregatesInputSchema),z.lazy(() => PlatformScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const GenreWhereInputSchema: z.ZodType<Prisma.GenreWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GenreWhereInputSchema),z.lazy(() => GenreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GenreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GenreWhereInputSchema),z.lazy(() => GenreWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  games: z.lazy(() => GameListRelationFilterSchema).optional()
}).strict();

export const GenreOrderByWithRelationInputSchema: z.ZodType<Prisma.GenreOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  games: z.lazy(() => GameOrderByRelationAggregateInputSchema).optional()
}).strict();

export const GenreWhereUniqueInputSchema: z.ZodType<Prisma.GenreWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    slug: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => GenreWhereInputSchema),z.lazy(() => GenreWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GenreWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GenreWhereInputSchema),z.lazy(() => GenreWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  games: z.lazy(() => GameListRelationFilterSchema).optional()
}).strict());

export const GenreOrderByWithAggregationInputSchema: z.ZodType<Prisma.GenreOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GenreCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GenreMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GenreMinOrderByAggregateInputSchema).optional()
}).strict();

export const GenreScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GenreScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GenreScalarWhereWithAggregatesInputSchema),z.lazy(() => GenreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GenreScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GenreScalarWhereWithAggregatesInputSchema),z.lazy(() => GenreScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  games: z.lazy(() => GameListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  games: z.lazy(() => GameOrderByRelationAggregateInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    slug: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  games: z.lazy(() => GameListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const GameCreateInputSchema: z.ZodType<Prisma.GameCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  developers: z.lazy(() => DeveloperCreateNestedManyWithoutGamesInputSchema).optional(),
  publishers: z.lazy(() => PublisherCreateNestedManyWithoutGamesInputSchema).optional(),
  platforms: z.lazy(() => PlatformCreateNestedManyWithoutGamesInputSchema).optional(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutGamesInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutGamesInputSchema).optional()
}).strict();

export const GameUncheckedCreateInputSchema: z.ZodType<Prisma.GameUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  developers: z.lazy(() => DeveloperUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  publishers: z.lazy(() => PublisherUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  platforms: z.lazy(() => PlatformUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutGamesInputSchema).optional()
}).strict();

export const GameUpdateInputSchema: z.ZodType<Prisma.GameUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  developers: z.lazy(() => DeveloperUpdateManyWithoutGamesNestedInputSchema).optional(),
  publishers: z.lazy(() => PublisherUpdateManyWithoutGamesNestedInputSchema).optional(),
  platforms: z.lazy(() => PlatformUpdateManyWithoutGamesNestedInputSchema).optional(),
  genres: z.lazy(() => GenreUpdateManyWithoutGamesNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutGamesNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateInputSchema: z.ZodType<Prisma.GameUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  developers: z.lazy(() => DeveloperUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  publishers: z.lazy(() => PublisherUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  platforms: z.lazy(() => PlatformUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutGamesNestedInputSchema).optional()
}).strict();

export const GameCreateManyInputSchema: z.ZodType<Prisma.GameCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const GameUpdateManyMutationInputSchema: z.ZodType<Prisma.GameUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeveloperCreateInputSchema: z.ZodType<Prisma.DeveloperCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  games: z.lazy(() => GameCreateNestedManyWithoutDevelopersInputSchema).optional()
}).strict();

export const DeveloperUncheckedCreateInputSchema: z.ZodType<Prisma.DeveloperUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  games: z.lazy(() => GameUncheckedCreateNestedManyWithoutDevelopersInputSchema).optional()
}).strict();

export const DeveloperUpdateInputSchema: z.ZodType<Prisma.DeveloperUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  games: z.lazy(() => GameUpdateManyWithoutDevelopersNestedInputSchema).optional()
}).strict();

export const DeveloperUncheckedUpdateInputSchema: z.ZodType<Prisma.DeveloperUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  games: z.lazy(() => GameUncheckedUpdateManyWithoutDevelopersNestedInputSchema).optional()
}).strict();

export const DeveloperCreateManyInputSchema: z.ZodType<Prisma.DeveloperCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const DeveloperUpdateManyMutationInputSchema: z.ZodType<Prisma.DeveloperUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeveloperUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DeveloperUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PublisherCreateInputSchema: z.ZodType<Prisma.PublisherCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  games: z.lazy(() => GameCreateNestedManyWithoutPublishersInputSchema).optional()
}).strict();

export const PublisherUncheckedCreateInputSchema: z.ZodType<Prisma.PublisherUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  games: z.lazy(() => GameUncheckedCreateNestedManyWithoutPublishersInputSchema).optional()
}).strict();

export const PublisherUpdateInputSchema: z.ZodType<Prisma.PublisherUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  games: z.lazy(() => GameUpdateManyWithoutPublishersNestedInputSchema).optional()
}).strict();

export const PublisherUncheckedUpdateInputSchema: z.ZodType<Prisma.PublisherUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  games: z.lazy(() => GameUncheckedUpdateManyWithoutPublishersNestedInputSchema).optional()
}).strict();

export const PublisherCreateManyInputSchema: z.ZodType<Prisma.PublisherCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const PublisherUpdateManyMutationInputSchema: z.ZodType<Prisma.PublisherUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PublisherUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PublisherUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlatformCreateInputSchema: z.ZodType<Prisma.PlatformCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  games: z.lazy(() => GameCreateNestedManyWithoutPlatformsInputSchema).optional()
}).strict();

export const PlatformUncheckedCreateInputSchema: z.ZodType<Prisma.PlatformUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  games: z.lazy(() => GameUncheckedCreateNestedManyWithoutPlatformsInputSchema).optional()
}).strict();

export const PlatformUpdateInputSchema: z.ZodType<Prisma.PlatformUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  games: z.lazy(() => GameUpdateManyWithoutPlatformsNestedInputSchema).optional()
}).strict();

export const PlatformUncheckedUpdateInputSchema: z.ZodType<Prisma.PlatformUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  games: z.lazy(() => GameUncheckedUpdateManyWithoutPlatformsNestedInputSchema).optional()
}).strict();

export const PlatformCreateManyInputSchema: z.ZodType<Prisma.PlatformCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const PlatformUpdateManyMutationInputSchema: z.ZodType<Prisma.PlatformUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlatformUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PlatformUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GenreCreateInputSchema: z.ZodType<Prisma.GenreCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  games: z.lazy(() => GameCreateNestedManyWithoutGenresInputSchema).optional()
}).strict();

export const GenreUncheckedCreateInputSchema: z.ZodType<Prisma.GenreUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  games: z.lazy(() => GameUncheckedCreateNestedManyWithoutGenresInputSchema).optional()
}).strict();

export const GenreUpdateInputSchema: z.ZodType<Prisma.GenreUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  games: z.lazy(() => GameUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict();

export const GenreUncheckedUpdateInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  games: z.lazy(() => GameUncheckedUpdateManyWithoutGenresNestedInputSchema).optional()
}).strict();

export const GenreCreateManyInputSchema: z.ZodType<Prisma.GenreCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const GenreUpdateManyMutationInputSchema: z.ZodType<Prisma.GenreUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GenreUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  games: z.lazy(() => GameCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  games: z.lazy(() => GameUncheckedCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  games: z.lazy(() => GameUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  games: z.lazy(() => GameUncheckedUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DecimalFilterSchema: z.ZodType<Prisma.DecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const DeveloperListRelationFilterSchema: z.ZodType<Prisma.DeveloperListRelationFilter> = z.object({
  every: z.lazy(() => DeveloperWhereInputSchema).optional(),
  some: z.lazy(() => DeveloperWhereInputSchema).optional(),
  none: z.lazy(() => DeveloperWhereInputSchema).optional()
}).strict();

export const PublisherListRelationFilterSchema: z.ZodType<Prisma.PublisherListRelationFilter> = z.object({
  every: z.lazy(() => PublisherWhereInputSchema).optional(),
  some: z.lazy(() => PublisherWhereInputSchema).optional(),
  none: z.lazy(() => PublisherWhereInputSchema).optional()
}).strict();

export const PlatformListRelationFilterSchema: z.ZodType<Prisma.PlatformListRelationFilter> = z.object({
  every: z.lazy(() => PlatformWhereInputSchema).optional(),
  some: z.lazy(() => PlatformWhereInputSchema).optional(),
  none: z.lazy(() => PlatformWhereInputSchema).optional()
}).strict();

export const GenreListRelationFilterSchema: z.ZodType<Prisma.GenreListRelationFilter> = z.object({
  every: z.lazy(() => GenreWhereInputSchema).optional(),
  some: z.lazy(() => GenreWhereInputSchema).optional(),
  none: z.lazy(() => GenreWhereInputSchema).optional()
}).strict();

export const TagListRelationFilterSchema: z.ZodType<Prisma.TagListRelationFilter> = z.object({
  every: z.lazy(() => TagWhereInputSchema).optional(),
  some: z.lazy(() => TagWhereInputSchema).optional(),
  none: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const DeveloperOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DeveloperOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PublisherOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PublisherOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlatformOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PlatformOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GenreOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GenreOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameCountOrderByAggregateInputSchema: z.ZodType<Prisma.GameCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GameAvgOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GameMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameMinOrderByAggregateInputSchema: z.ZodType<Prisma.GameMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  releaseDate: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GameSumOrderByAggregateInputSchema: z.ZodType<Prisma.GameSumOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DecimalWithAggregatesFilterSchema: z.ZodType<Prisma.DecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const GameListRelationFilterSchema: z.ZodType<Prisma.GameListRelationFilter> = z.object({
  every: z.lazy(() => GameWhereInputSchema).optional(),
  some: z.lazy(() => GameWhereInputSchema).optional(),
  none: z.lazy(() => GameWhereInputSchema).optional()
}).strict();

export const GameOrderByRelationAggregateInputSchema: z.ZodType<Prisma.GameOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeveloperCountOrderByAggregateInputSchema: z.ZodType<Prisma.DeveloperCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeveloperMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DeveloperMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeveloperMinOrderByAggregateInputSchema: z.ZodType<Prisma.DeveloperMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PublisherCountOrderByAggregateInputSchema: z.ZodType<Prisma.PublisherCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PublisherMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PublisherMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PublisherMinOrderByAggregateInputSchema: z.ZodType<Prisma.PublisherMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlatformCountOrderByAggregateInputSchema: z.ZodType<Prisma.PlatformCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlatformMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PlatformMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PlatformMinOrderByAggregateInputSchema: z.ZodType<Prisma.PlatformMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GenreCountOrderByAggregateInputSchema: z.ZodType<Prisma.GenreCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GenreMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GenreMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GenreMinOrderByAggregateInputSchema: z.ZodType<Prisma.GenreMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DeveloperCreateNestedManyWithoutGamesInputSchema: z.ZodType<Prisma.DeveloperCreateNestedManyWithoutGamesInput> = z.object({
  create: z.union([ z.lazy(() => DeveloperCreateWithoutGamesInputSchema),z.lazy(() => DeveloperCreateWithoutGamesInputSchema).array(),z.lazy(() => DeveloperUncheckedCreateWithoutGamesInputSchema),z.lazy(() => DeveloperUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeveloperCreateOrConnectWithoutGamesInputSchema),z.lazy(() => DeveloperCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DeveloperWhereUniqueInputSchema),z.lazy(() => DeveloperWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PublisherCreateNestedManyWithoutGamesInputSchema: z.ZodType<Prisma.PublisherCreateNestedManyWithoutGamesInput> = z.object({
  create: z.union([ z.lazy(() => PublisherCreateWithoutGamesInputSchema),z.lazy(() => PublisherCreateWithoutGamesInputSchema).array(),z.lazy(() => PublisherUncheckedCreateWithoutGamesInputSchema),z.lazy(() => PublisherUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PublisherCreateOrConnectWithoutGamesInputSchema),z.lazy(() => PublisherCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PublisherWhereUniqueInputSchema),z.lazy(() => PublisherWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PlatformCreateNestedManyWithoutGamesInputSchema: z.ZodType<Prisma.PlatformCreateNestedManyWithoutGamesInput> = z.object({
  create: z.union([ z.lazy(() => PlatformCreateWithoutGamesInputSchema),z.lazy(() => PlatformCreateWithoutGamesInputSchema).array(),z.lazy(() => PlatformUncheckedCreateWithoutGamesInputSchema),z.lazy(() => PlatformUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlatformCreateOrConnectWithoutGamesInputSchema),z.lazy(() => PlatformCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GenreCreateNestedManyWithoutGamesInputSchema: z.ZodType<Prisma.GenreCreateNestedManyWithoutGamesInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutGamesInputSchema),z.lazy(() => GenreCreateWithoutGamesInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutGamesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutGamesInputSchema),z.lazy(() => GenreCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagCreateNestedManyWithoutGamesInputSchema: z.ZodType<Prisma.TagCreateNestedManyWithoutGamesInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutGamesInputSchema),z.lazy(() => TagCreateWithoutGamesInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutGamesInputSchema),z.lazy(() => TagUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutGamesInputSchema),z.lazy(() => TagCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DeveloperUncheckedCreateNestedManyWithoutGamesInputSchema: z.ZodType<Prisma.DeveloperUncheckedCreateNestedManyWithoutGamesInput> = z.object({
  create: z.union([ z.lazy(() => DeveloperCreateWithoutGamesInputSchema),z.lazy(() => DeveloperCreateWithoutGamesInputSchema).array(),z.lazy(() => DeveloperUncheckedCreateWithoutGamesInputSchema),z.lazy(() => DeveloperUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeveloperCreateOrConnectWithoutGamesInputSchema),z.lazy(() => DeveloperCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DeveloperWhereUniqueInputSchema),z.lazy(() => DeveloperWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PublisherUncheckedCreateNestedManyWithoutGamesInputSchema: z.ZodType<Prisma.PublisherUncheckedCreateNestedManyWithoutGamesInput> = z.object({
  create: z.union([ z.lazy(() => PublisherCreateWithoutGamesInputSchema),z.lazy(() => PublisherCreateWithoutGamesInputSchema).array(),z.lazy(() => PublisherUncheckedCreateWithoutGamesInputSchema),z.lazy(() => PublisherUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PublisherCreateOrConnectWithoutGamesInputSchema),z.lazy(() => PublisherCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PublisherWhereUniqueInputSchema),z.lazy(() => PublisherWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PlatformUncheckedCreateNestedManyWithoutGamesInputSchema: z.ZodType<Prisma.PlatformUncheckedCreateNestedManyWithoutGamesInput> = z.object({
  create: z.union([ z.lazy(() => PlatformCreateWithoutGamesInputSchema),z.lazy(() => PlatformCreateWithoutGamesInputSchema).array(),z.lazy(() => PlatformUncheckedCreateWithoutGamesInputSchema),z.lazy(() => PlatformUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlatformCreateOrConnectWithoutGamesInputSchema),z.lazy(() => PlatformCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GenreUncheckedCreateNestedManyWithoutGamesInputSchema: z.ZodType<Prisma.GenreUncheckedCreateNestedManyWithoutGamesInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutGamesInputSchema),z.lazy(() => GenreCreateWithoutGamesInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutGamesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutGamesInputSchema),z.lazy(() => GenreCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagUncheckedCreateNestedManyWithoutGamesInputSchema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutGamesInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutGamesInputSchema),z.lazy(() => TagCreateWithoutGamesInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutGamesInputSchema),z.lazy(() => TagUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutGamesInputSchema),z.lazy(() => TagCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DecimalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DecimalFieldUpdateOperationsInput> = z.object({
  set: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  increment: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  decrement: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  multiply: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  divide: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DeveloperUpdateManyWithoutGamesNestedInputSchema: z.ZodType<Prisma.DeveloperUpdateManyWithoutGamesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DeveloperCreateWithoutGamesInputSchema),z.lazy(() => DeveloperCreateWithoutGamesInputSchema).array(),z.lazy(() => DeveloperUncheckedCreateWithoutGamesInputSchema),z.lazy(() => DeveloperUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeveloperCreateOrConnectWithoutGamesInputSchema),z.lazy(() => DeveloperCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DeveloperUpsertWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => DeveloperUpsertWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DeveloperWhereUniqueInputSchema),z.lazy(() => DeveloperWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DeveloperWhereUniqueInputSchema),z.lazy(() => DeveloperWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DeveloperWhereUniqueInputSchema),z.lazy(() => DeveloperWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DeveloperWhereUniqueInputSchema),z.lazy(() => DeveloperWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DeveloperUpdateWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => DeveloperUpdateWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DeveloperUpdateManyWithWhereWithoutGamesInputSchema),z.lazy(() => DeveloperUpdateManyWithWhereWithoutGamesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DeveloperScalarWhereInputSchema),z.lazy(() => DeveloperScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PublisherUpdateManyWithoutGamesNestedInputSchema: z.ZodType<Prisma.PublisherUpdateManyWithoutGamesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PublisherCreateWithoutGamesInputSchema),z.lazy(() => PublisherCreateWithoutGamesInputSchema).array(),z.lazy(() => PublisherUncheckedCreateWithoutGamesInputSchema),z.lazy(() => PublisherUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PublisherCreateOrConnectWithoutGamesInputSchema),z.lazy(() => PublisherCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PublisherUpsertWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => PublisherUpsertWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PublisherWhereUniqueInputSchema),z.lazy(() => PublisherWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PublisherWhereUniqueInputSchema),z.lazy(() => PublisherWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PublisherWhereUniqueInputSchema),z.lazy(() => PublisherWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PublisherWhereUniqueInputSchema),z.lazy(() => PublisherWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PublisherUpdateWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => PublisherUpdateWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PublisherUpdateManyWithWhereWithoutGamesInputSchema),z.lazy(() => PublisherUpdateManyWithWhereWithoutGamesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PublisherScalarWhereInputSchema),z.lazy(() => PublisherScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PlatformUpdateManyWithoutGamesNestedInputSchema: z.ZodType<Prisma.PlatformUpdateManyWithoutGamesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlatformCreateWithoutGamesInputSchema),z.lazy(() => PlatformCreateWithoutGamesInputSchema).array(),z.lazy(() => PlatformUncheckedCreateWithoutGamesInputSchema),z.lazy(() => PlatformUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlatformCreateOrConnectWithoutGamesInputSchema),z.lazy(() => PlatformCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PlatformUpsertWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => PlatformUpsertWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PlatformUpdateWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => PlatformUpdateWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PlatformUpdateManyWithWhereWithoutGamesInputSchema),z.lazy(() => PlatformUpdateManyWithWhereWithoutGamesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PlatformScalarWhereInputSchema),z.lazy(() => PlatformScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GenreUpdateManyWithoutGamesNestedInputSchema: z.ZodType<Prisma.GenreUpdateManyWithoutGamesNestedInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutGamesInputSchema),z.lazy(() => GenreCreateWithoutGamesInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutGamesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutGamesInputSchema),z.lazy(() => GenreCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GenreUpsertWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => GenreUpsertWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GenreUpdateWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => GenreUpdateWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GenreUpdateManyWithWhereWithoutGamesInputSchema),z.lazy(() => GenreUpdateManyWithWhereWithoutGamesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GenreScalarWhereInputSchema),z.lazy(() => GenreScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUpdateManyWithoutGamesNestedInputSchema: z.ZodType<Prisma.TagUpdateManyWithoutGamesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutGamesInputSchema),z.lazy(() => TagCreateWithoutGamesInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutGamesInputSchema),z.lazy(() => TagUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutGamesInputSchema),z.lazy(() => TagCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutGamesInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutGamesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DeveloperUncheckedUpdateManyWithoutGamesNestedInputSchema: z.ZodType<Prisma.DeveloperUncheckedUpdateManyWithoutGamesNestedInput> = z.object({
  create: z.union([ z.lazy(() => DeveloperCreateWithoutGamesInputSchema),z.lazy(() => DeveloperCreateWithoutGamesInputSchema).array(),z.lazy(() => DeveloperUncheckedCreateWithoutGamesInputSchema),z.lazy(() => DeveloperUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DeveloperCreateOrConnectWithoutGamesInputSchema),z.lazy(() => DeveloperCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DeveloperUpsertWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => DeveloperUpsertWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => DeveloperWhereUniqueInputSchema),z.lazy(() => DeveloperWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DeveloperWhereUniqueInputSchema),z.lazy(() => DeveloperWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DeveloperWhereUniqueInputSchema),z.lazy(() => DeveloperWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DeveloperWhereUniqueInputSchema),z.lazy(() => DeveloperWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DeveloperUpdateWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => DeveloperUpdateWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DeveloperUpdateManyWithWhereWithoutGamesInputSchema),z.lazy(() => DeveloperUpdateManyWithWhereWithoutGamesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DeveloperScalarWhereInputSchema),z.lazy(() => DeveloperScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PublisherUncheckedUpdateManyWithoutGamesNestedInputSchema: z.ZodType<Prisma.PublisherUncheckedUpdateManyWithoutGamesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PublisherCreateWithoutGamesInputSchema),z.lazy(() => PublisherCreateWithoutGamesInputSchema).array(),z.lazy(() => PublisherUncheckedCreateWithoutGamesInputSchema),z.lazy(() => PublisherUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PublisherCreateOrConnectWithoutGamesInputSchema),z.lazy(() => PublisherCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PublisherUpsertWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => PublisherUpsertWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PublisherWhereUniqueInputSchema),z.lazy(() => PublisherWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PublisherWhereUniqueInputSchema),z.lazy(() => PublisherWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PublisherWhereUniqueInputSchema),z.lazy(() => PublisherWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PublisherWhereUniqueInputSchema),z.lazy(() => PublisherWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PublisherUpdateWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => PublisherUpdateWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PublisherUpdateManyWithWhereWithoutGamesInputSchema),z.lazy(() => PublisherUpdateManyWithWhereWithoutGamesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PublisherScalarWhereInputSchema),z.lazy(() => PublisherScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PlatformUncheckedUpdateManyWithoutGamesNestedInputSchema: z.ZodType<Prisma.PlatformUncheckedUpdateManyWithoutGamesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PlatformCreateWithoutGamesInputSchema),z.lazy(() => PlatformCreateWithoutGamesInputSchema).array(),z.lazy(() => PlatformUncheckedCreateWithoutGamesInputSchema),z.lazy(() => PlatformUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PlatformCreateOrConnectWithoutGamesInputSchema),z.lazy(() => PlatformCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PlatformUpsertWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => PlatformUpsertWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PlatformWhereUniqueInputSchema),z.lazy(() => PlatformWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PlatformUpdateWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => PlatformUpdateWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PlatformUpdateManyWithWhereWithoutGamesInputSchema),z.lazy(() => PlatformUpdateManyWithWhereWithoutGamesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PlatformScalarWhereInputSchema),z.lazy(() => PlatformScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GenreUncheckedUpdateManyWithoutGamesNestedInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateManyWithoutGamesNestedInput> = z.object({
  create: z.union([ z.lazy(() => GenreCreateWithoutGamesInputSchema),z.lazy(() => GenreCreateWithoutGamesInputSchema).array(),z.lazy(() => GenreUncheckedCreateWithoutGamesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GenreCreateOrConnectWithoutGamesInputSchema),z.lazy(() => GenreCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GenreUpsertWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => GenreUpsertWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GenreWhereUniqueInputSchema),z.lazy(() => GenreWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GenreUpdateWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => GenreUpdateWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GenreUpdateManyWithWhereWithoutGamesInputSchema),z.lazy(() => GenreUpdateManyWithWhereWithoutGamesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GenreScalarWhereInputSchema),z.lazy(() => GenreScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUncheckedUpdateManyWithoutGamesNestedInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutGamesNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutGamesInputSchema),z.lazy(() => TagCreateWithoutGamesInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutGamesInputSchema),z.lazy(() => TagUncheckedCreateWithoutGamesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutGamesInputSchema),z.lazy(() => TagCreateOrConnectWithoutGamesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutGamesInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutGamesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutGamesInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutGamesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameCreateNestedManyWithoutDevelopersInputSchema: z.ZodType<Prisma.GameCreateNestedManyWithoutDevelopersInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutDevelopersInputSchema),z.lazy(() => GameCreateWithoutDevelopersInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutDevelopersInputSchema),z.lazy(() => GameUncheckedCreateWithoutDevelopersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutDevelopersInputSchema),z.lazy(() => GameCreateOrConnectWithoutDevelopersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameUncheckedCreateNestedManyWithoutDevelopersInputSchema: z.ZodType<Prisma.GameUncheckedCreateNestedManyWithoutDevelopersInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutDevelopersInputSchema),z.lazy(() => GameCreateWithoutDevelopersInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutDevelopersInputSchema),z.lazy(() => GameUncheckedCreateWithoutDevelopersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutDevelopersInputSchema),z.lazy(() => GameCreateOrConnectWithoutDevelopersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameUpdateManyWithoutDevelopersNestedInputSchema: z.ZodType<Prisma.GameUpdateManyWithoutDevelopersNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutDevelopersInputSchema),z.lazy(() => GameCreateWithoutDevelopersInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutDevelopersInputSchema),z.lazy(() => GameUncheckedCreateWithoutDevelopersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutDevelopersInputSchema),z.lazy(() => GameCreateOrConnectWithoutDevelopersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameUpsertWithWhereUniqueWithoutDevelopersInputSchema),z.lazy(() => GameUpsertWithWhereUniqueWithoutDevelopersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithWhereUniqueWithoutDevelopersInputSchema),z.lazy(() => GameUpdateWithWhereUniqueWithoutDevelopersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameUpdateManyWithWhereWithoutDevelopersInputSchema),z.lazy(() => GameUpdateManyWithWhereWithoutDevelopersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameUncheckedUpdateManyWithoutDevelopersNestedInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyWithoutDevelopersNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutDevelopersInputSchema),z.lazy(() => GameCreateWithoutDevelopersInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutDevelopersInputSchema),z.lazy(() => GameUncheckedCreateWithoutDevelopersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutDevelopersInputSchema),z.lazy(() => GameCreateOrConnectWithoutDevelopersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameUpsertWithWhereUniqueWithoutDevelopersInputSchema),z.lazy(() => GameUpsertWithWhereUniqueWithoutDevelopersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithWhereUniqueWithoutDevelopersInputSchema),z.lazy(() => GameUpdateWithWhereUniqueWithoutDevelopersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameUpdateManyWithWhereWithoutDevelopersInputSchema),z.lazy(() => GameUpdateManyWithWhereWithoutDevelopersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameCreateNestedManyWithoutPublishersInputSchema: z.ZodType<Prisma.GameCreateNestedManyWithoutPublishersInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutPublishersInputSchema),z.lazy(() => GameCreateWithoutPublishersInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutPublishersInputSchema),z.lazy(() => GameUncheckedCreateWithoutPublishersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutPublishersInputSchema),z.lazy(() => GameCreateOrConnectWithoutPublishersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameUncheckedCreateNestedManyWithoutPublishersInputSchema: z.ZodType<Prisma.GameUncheckedCreateNestedManyWithoutPublishersInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutPublishersInputSchema),z.lazy(() => GameCreateWithoutPublishersInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutPublishersInputSchema),z.lazy(() => GameUncheckedCreateWithoutPublishersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutPublishersInputSchema),z.lazy(() => GameCreateOrConnectWithoutPublishersInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameUpdateManyWithoutPublishersNestedInputSchema: z.ZodType<Prisma.GameUpdateManyWithoutPublishersNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutPublishersInputSchema),z.lazy(() => GameCreateWithoutPublishersInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutPublishersInputSchema),z.lazy(() => GameUncheckedCreateWithoutPublishersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutPublishersInputSchema),z.lazy(() => GameCreateOrConnectWithoutPublishersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameUpsertWithWhereUniqueWithoutPublishersInputSchema),z.lazy(() => GameUpsertWithWhereUniqueWithoutPublishersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithWhereUniqueWithoutPublishersInputSchema),z.lazy(() => GameUpdateWithWhereUniqueWithoutPublishersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameUpdateManyWithWhereWithoutPublishersInputSchema),z.lazy(() => GameUpdateManyWithWhereWithoutPublishersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameUncheckedUpdateManyWithoutPublishersNestedInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyWithoutPublishersNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutPublishersInputSchema),z.lazy(() => GameCreateWithoutPublishersInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutPublishersInputSchema),z.lazy(() => GameUncheckedCreateWithoutPublishersInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutPublishersInputSchema),z.lazy(() => GameCreateOrConnectWithoutPublishersInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameUpsertWithWhereUniqueWithoutPublishersInputSchema),z.lazy(() => GameUpsertWithWhereUniqueWithoutPublishersInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithWhereUniqueWithoutPublishersInputSchema),z.lazy(() => GameUpdateWithWhereUniqueWithoutPublishersInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameUpdateManyWithWhereWithoutPublishersInputSchema),z.lazy(() => GameUpdateManyWithWhereWithoutPublishersInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameCreateNestedManyWithoutPlatformsInputSchema: z.ZodType<Prisma.GameCreateNestedManyWithoutPlatformsInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutPlatformsInputSchema),z.lazy(() => GameCreateWithoutPlatformsInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutPlatformsInputSchema),z.lazy(() => GameUncheckedCreateWithoutPlatformsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutPlatformsInputSchema),z.lazy(() => GameCreateOrConnectWithoutPlatformsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameUncheckedCreateNestedManyWithoutPlatformsInputSchema: z.ZodType<Prisma.GameUncheckedCreateNestedManyWithoutPlatformsInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutPlatformsInputSchema),z.lazy(() => GameCreateWithoutPlatformsInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutPlatformsInputSchema),z.lazy(() => GameUncheckedCreateWithoutPlatformsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutPlatformsInputSchema),z.lazy(() => GameCreateOrConnectWithoutPlatformsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameUpdateManyWithoutPlatformsNestedInputSchema: z.ZodType<Prisma.GameUpdateManyWithoutPlatformsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutPlatformsInputSchema),z.lazy(() => GameCreateWithoutPlatformsInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutPlatformsInputSchema),z.lazy(() => GameUncheckedCreateWithoutPlatformsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutPlatformsInputSchema),z.lazy(() => GameCreateOrConnectWithoutPlatformsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameUpsertWithWhereUniqueWithoutPlatformsInputSchema),z.lazy(() => GameUpsertWithWhereUniqueWithoutPlatformsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithWhereUniqueWithoutPlatformsInputSchema),z.lazy(() => GameUpdateWithWhereUniqueWithoutPlatformsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameUpdateManyWithWhereWithoutPlatformsInputSchema),z.lazy(() => GameUpdateManyWithWhereWithoutPlatformsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameUncheckedUpdateManyWithoutPlatformsNestedInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyWithoutPlatformsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutPlatformsInputSchema),z.lazy(() => GameCreateWithoutPlatformsInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutPlatformsInputSchema),z.lazy(() => GameUncheckedCreateWithoutPlatformsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutPlatformsInputSchema),z.lazy(() => GameCreateOrConnectWithoutPlatformsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameUpsertWithWhereUniqueWithoutPlatformsInputSchema),z.lazy(() => GameUpsertWithWhereUniqueWithoutPlatformsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithWhereUniqueWithoutPlatformsInputSchema),z.lazy(() => GameUpdateWithWhereUniqueWithoutPlatformsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameUpdateManyWithWhereWithoutPlatformsInputSchema),z.lazy(() => GameUpdateManyWithWhereWithoutPlatformsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameCreateNestedManyWithoutGenresInputSchema: z.ZodType<Prisma.GameCreateNestedManyWithoutGenresInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutGenresInputSchema),z.lazy(() => GameCreateWithoutGenresInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutGenresInputSchema),z.lazy(() => GameUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutGenresInputSchema),z.lazy(() => GameCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameUncheckedCreateNestedManyWithoutGenresInputSchema: z.ZodType<Prisma.GameUncheckedCreateNestedManyWithoutGenresInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutGenresInputSchema),z.lazy(() => GameCreateWithoutGenresInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutGenresInputSchema),z.lazy(() => GameUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutGenresInputSchema),z.lazy(() => GameCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameUpdateManyWithoutGenresNestedInputSchema: z.ZodType<Prisma.GameUpdateManyWithoutGenresNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutGenresInputSchema),z.lazy(() => GameCreateWithoutGenresInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutGenresInputSchema),z.lazy(() => GameUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutGenresInputSchema),z.lazy(() => GameCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameUpsertWithWhereUniqueWithoutGenresInputSchema),z.lazy(() => GameUpsertWithWhereUniqueWithoutGenresInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithWhereUniqueWithoutGenresInputSchema),z.lazy(() => GameUpdateWithWhereUniqueWithoutGenresInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameUpdateManyWithWhereWithoutGenresInputSchema),z.lazy(() => GameUpdateManyWithWhereWithoutGenresInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameUncheckedUpdateManyWithoutGenresNestedInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyWithoutGenresNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutGenresInputSchema),z.lazy(() => GameCreateWithoutGenresInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutGenresInputSchema),z.lazy(() => GameUncheckedCreateWithoutGenresInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutGenresInputSchema),z.lazy(() => GameCreateOrConnectWithoutGenresInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameUpsertWithWhereUniqueWithoutGenresInputSchema),z.lazy(() => GameUpsertWithWhereUniqueWithoutGenresInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithWhereUniqueWithoutGenresInputSchema),z.lazy(() => GameUpdateWithWhereUniqueWithoutGenresInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameUpdateManyWithWhereWithoutGenresInputSchema),z.lazy(() => GameUpdateManyWithWhereWithoutGenresInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.GameCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutTagsInputSchema),z.lazy(() => GameCreateWithoutTagsInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutTagsInputSchema),z.lazy(() => GameUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutTagsInputSchema),z.lazy(() => GameCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameUncheckedCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.GameUncheckedCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutTagsInputSchema),z.lazy(() => GameCreateWithoutTagsInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutTagsInputSchema),z.lazy(() => GameUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutTagsInputSchema),z.lazy(() => GameCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const GameUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.GameUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutTagsInputSchema),z.lazy(() => GameCreateWithoutTagsInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutTagsInputSchema),z.lazy(() => GameUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutTagsInputSchema),z.lazy(() => GameCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => GameUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => GameUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => GameUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GameUncheckedUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => GameCreateWithoutTagsInputSchema),z.lazy(() => GameCreateWithoutTagsInputSchema).array(),z.lazy(() => GameUncheckedCreateWithoutTagsInputSchema),z.lazy(() => GameUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => GameCreateOrConnectWithoutTagsInputSchema),z.lazy(() => GameCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => GameUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => GameUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => GameWhereUniqueInputSchema),z.lazy(() => GameWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => GameUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => GameUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => GameUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => GameUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDecimalFilterSchema: z.ZodType<Prisma.NestedDecimalFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDecimalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDecimalWithAggregatesFilter> = z.object({
  equals: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  in: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  notIn: z.union([z.number().array(),z.string().array(),z.instanceof(Decimal).array(),z.instanceof(Prisma.Decimal).array(),DecimalJsLikeSchema.array(),]).refine((v) => Array.isArray(v) && (v as any[]).every((v) => isValidDecimalInput(v)), { message: 'Must be a Decimal' }).optional(),
  lt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  lte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gt: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  gte: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional(),
  not: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NestedDecimalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _sum: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _min: z.lazy(() => NestedDecimalFilterSchema).optional(),
  _max: z.lazy(() => NestedDecimalFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const DeveloperCreateWithoutGamesInputSchema: z.ZodType<Prisma.DeveloperCreateWithoutGamesInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const DeveloperUncheckedCreateWithoutGamesInputSchema: z.ZodType<Prisma.DeveloperUncheckedCreateWithoutGamesInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const DeveloperCreateOrConnectWithoutGamesInputSchema: z.ZodType<Prisma.DeveloperCreateOrConnectWithoutGamesInput> = z.object({
  where: z.lazy(() => DeveloperWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DeveloperCreateWithoutGamesInputSchema),z.lazy(() => DeveloperUncheckedCreateWithoutGamesInputSchema) ]),
}).strict();

export const PublisherCreateWithoutGamesInputSchema: z.ZodType<Prisma.PublisherCreateWithoutGamesInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const PublisherUncheckedCreateWithoutGamesInputSchema: z.ZodType<Prisma.PublisherUncheckedCreateWithoutGamesInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const PublisherCreateOrConnectWithoutGamesInputSchema: z.ZodType<Prisma.PublisherCreateOrConnectWithoutGamesInput> = z.object({
  where: z.lazy(() => PublisherWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PublisherCreateWithoutGamesInputSchema),z.lazy(() => PublisherUncheckedCreateWithoutGamesInputSchema) ]),
}).strict();

export const PlatformCreateWithoutGamesInputSchema: z.ZodType<Prisma.PlatformCreateWithoutGamesInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const PlatformUncheckedCreateWithoutGamesInputSchema: z.ZodType<Prisma.PlatformUncheckedCreateWithoutGamesInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const PlatformCreateOrConnectWithoutGamesInputSchema: z.ZodType<Prisma.PlatformCreateOrConnectWithoutGamesInput> = z.object({
  where: z.lazy(() => PlatformWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PlatformCreateWithoutGamesInputSchema),z.lazy(() => PlatformUncheckedCreateWithoutGamesInputSchema) ]),
}).strict();

export const GenreCreateWithoutGamesInputSchema: z.ZodType<Prisma.GenreCreateWithoutGamesInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const GenreUncheckedCreateWithoutGamesInputSchema: z.ZodType<Prisma.GenreUncheckedCreateWithoutGamesInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const GenreCreateOrConnectWithoutGamesInputSchema: z.ZodType<Prisma.GenreCreateOrConnectWithoutGamesInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GenreCreateWithoutGamesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutGamesInputSchema) ]),
}).strict();

export const TagCreateWithoutGamesInputSchema: z.ZodType<Prisma.TagCreateWithoutGamesInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const TagUncheckedCreateWithoutGamesInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutGamesInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string()
}).strict();

export const TagCreateOrConnectWithoutGamesInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutGamesInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutGamesInputSchema),z.lazy(() => TagUncheckedCreateWithoutGamesInputSchema) ]),
}).strict();

export const DeveloperUpsertWithWhereUniqueWithoutGamesInputSchema: z.ZodType<Prisma.DeveloperUpsertWithWhereUniqueWithoutGamesInput> = z.object({
  where: z.lazy(() => DeveloperWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DeveloperUpdateWithoutGamesInputSchema),z.lazy(() => DeveloperUncheckedUpdateWithoutGamesInputSchema) ]),
  create: z.union([ z.lazy(() => DeveloperCreateWithoutGamesInputSchema),z.lazy(() => DeveloperUncheckedCreateWithoutGamesInputSchema) ]),
}).strict();

export const DeveloperUpdateWithWhereUniqueWithoutGamesInputSchema: z.ZodType<Prisma.DeveloperUpdateWithWhereUniqueWithoutGamesInput> = z.object({
  where: z.lazy(() => DeveloperWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DeveloperUpdateWithoutGamesInputSchema),z.lazy(() => DeveloperUncheckedUpdateWithoutGamesInputSchema) ]),
}).strict();

export const DeveloperUpdateManyWithWhereWithoutGamesInputSchema: z.ZodType<Prisma.DeveloperUpdateManyWithWhereWithoutGamesInput> = z.object({
  where: z.lazy(() => DeveloperScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DeveloperUpdateManyMutationInputSchema),z.lazy(() => DeveloperUncheckedUpdateManyWithoutGamesInputSchema) ]),
}).strict();

export const DeveloperScalarWhereInputSchema: z.ZodType<Prisma.DeveloperScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DeveloperScalarWhereInputSchema),z.lazy(() => DeveloperScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DeveloperScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DeveloperScalarWhereInputSchema),z.lazy(() => DeveloperScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PublisherUpsertWithWhereUniqueWithoutGamesInputSchema: z.ZodType<Prisma.PublisherUpsertWithWhereUniqueWithoutGamesInput> = z.object({
  where: z.lazy(() => PublisherWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PublisherUpdateWithoutGamesInputSchema),z.lazy(() => PublisherUncheckedUpdateWithoutGamesInputSchema) ]),
  create: z.union([ z.lazy(() => PublisherCreateWithoutGamesInputSchema),z.lazy(() => PublisherUncheckedCreateWithoutGamesInputSchema) ]),
}).strict();

export const PublisherUpdateWithWhereUniqueWithoutGamesInputSchema: z.ZodType<Prisma.PublisherUpdateWithWhereUniqueWithoutGamesInput> = z.object({
  where: z.lazy(() => PublisherWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PublisherUpdateWithoutGamesInputSchema),z.lazy(() => PublisherUncheckedUpdateWithoutGamesInputSchema) ]),
}).strict();

export const PublisherUpdateManyWithWhereWithoutGamesInputSchema: z.ZodType<Prisma.PublisherUpdateManyWithWhereWithoutGamesInput> = z.object({
  where: z.lazy(() => PublisherScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PublisherUpdateManyMutationInputSchema),z.lazy(() => PublisherUncheckedUpdateManyWithoutGamesInputSchema) ]),
}).strict();

export const PublisherScalarWhereInputSchema: z.ZodType<Prisma.PublisherScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PublisherScalarWhereInputSchema),z.lazy(() => PublisherScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PublisherScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PublisherScalarWhereInputSchema),z.lazy(() => PublisherScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PlatformUpsertWithWhereUniqueWithoutGamesInputSchema: z.ZodType<Prisma.PlatformUpsertWithWhereUniqueWithoutGamesInput> = z.object({
  where: z.lazy(() => PlatformWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PlatformUpdateWithoutGamesInputSchema),z.lazy(() => PlatformUncheckedUpdateWithoutGamesInputSchema) ]),
  create: z.union([ z.lazy(() => PlatformCreateWithoutGamesInputSchema),z.lazy(() => PlatformUncheckedCreateWithoutGamesInputSchema) ]),
}).strict();

export const PlatformUpdateWithWhereUniqueWithoutGamesInputSchema: z.ZodType<Prisma.PlatformUpdateWithWhereUniqueWithoutGamesInput> = z.object({
  where: z.lazy(() => PlatformWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PlatformUpdateWithoutGamesInputSchema),z.lazy(() => PlatformUncheckedUpdateWithoutGamesInputSchema) ]),
}).strict();

export const PlatformUpdateManyWithWhereWithoutGamesInputSchema: z.ZodType<Prisma.PlatformUpdateManyWithWhereWithoutGamesInput> = z.object({
  where: z.lazy(() => PlatformScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PlatformUpdateManyMutationInputSchema),z.lazy(() => PlatformUncheckedUpdateManyWithoutGamesInputSchema) ]),
}).strict();

export const PlatformScalarWhereInputSchema: z.ZodType<Prisma.PlatformScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PlatformScalarWhereInputSchema),z.lazy(() => PlatformScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PlatformScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PlatformScalarWhereInputSchema),z.lazy(() => PlatformScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const GenreUpsertWithWhereUniqueWithoutGamesInputSchema: z.ZodType<Prisma.GenreUpsertWithWhereUniqueWithoutGamesInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GenreUpdateWithoutGamesInputSchema),z.lazy(() => GenreUncheckedUpdateWithoutGamesInputSchema) ]),
  create: z.union([ z.lazy(() => GenreCreateWithoutGamesInputSchema),z.lazy(() => GenreUncheckedCreateWithoutGamesInputSchema) ]),
}).strict();

export const GenreUpdateWithWhereUniqueWithoutGamesInputSchema: z.ZodType<Prisma.GenreUpdateWithWhereUniqueWithoutGamesInput> = z.object({
  where: z.lazy(() => GenreWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GenreUpdateWithoutGamesInputSchema),z.lazy(() => GenreUncheckedUpdateWithoutGamesInputSchema) ]),
}).strict();

export const GenreUpdateManyWithWhereWithoutGamesInputSchema: z.ZodType<Prisma.GenreUpdateManyWithWhereWithoutGamesInput> = z.object({
  where: z.lazy(() => GenreScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GenreUpdateManyMutationInputSchema),z.lazy(() => GenreUncheckedUpdateManyWithoutGamesInputSchema) ]),
}).strict();

export const GenreScalarWhereInputSchema: z.ZodType<Prisma.GenreScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GenreScalarWhereInputSchema),z.lazy(() => GenreScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GenreScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GenreScalarWhereInputSchema),z.lazy(() => GenreScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TagUpsertWithWhereUniqueWithoutGamesInputSchema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutGamesInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TagUpdateWithoutGamesInputSchema),z.lazy(() => TagUncheckedUpdateWithoutGamesInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutGamesInputSchema),z.lazy(() => TagUncheckedCreateWithoutGamesInputSchema) ]),
}).strict();

export const TagUpdateWithWhereUniqueWithoutGamesInputSchema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutGamesInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TagUpdateWithoutGamesInputSchema),z.lazy(() => TagUncheckedUpdateWithoutGamesInputSchema) ]),
}).strict();

export const TagUpdateManyWithWhereWithoutGamesInputSchema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutGamesInput> = z.object({
  where: z.lazy(() => TagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TagUpdateManyMutationInputSchema),z.lazy(() => TagUncheckedUpdateManyWithoutGamesInputSchema) ]),
}).strict();

export const TagScalarWhereInputSchema: z.ZodType<Prisma.TagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const GameCreateWithoutDevelopersInputSchema: z.ZodType<Prisma.GameCreateWithoutDevelopersInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  publishers: z.lazy(() => PublisherCreateNestedManyWithoutGamesInputSchema).optional(),
  platforms: z.lazy(() => PlatformCreateNestedManyWithoutGamesInputSchema).optional(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutGamesInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutGamesInputSchema).optional()
}).strict();

export const GameUncheckedCreateWithoutDevelopersInputSchema: z.ZodType<Prisma.GameUncheckedCreateWithoutDevelopersInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  publishers: z.lazy(() => PublisherUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  platforms: z.lazy(() => PlatformUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutGamesInputSchema).optional()
}).strict();

export const GameCreateOrConnectWithoutDevelopersInputSchema: z.ZodType<Prisma.GameCreateOrConnectWithoutDevelopersInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GameCreateWithoutDevelopersInputSchema),z.lazy(() => GameUncheckedCreateWithoutDevelopersInputSchema) ]),
}).strict();

export const GameUpsertWithWhereUniqueWithoutDevelopersInputSchema: z.ZodType<Prisma.GameUpsertWithWhereUniqueWithoutDevelopersInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GameUpdateWithoutDevelopersInputSchema),z.lazy(() => GameUncheckedUpdateWithoutDevelopersInputSchema) ]),
  create: z.union([ z.lazy(() => GameCreateWithoutDevelopersInputSchema),z.lazy(() => GameUncheckedCreateWithoutDevelopersInputSchema) ]),
}).strict();

export const GameUpdateWithWhereUniqueWithoutDevelopersInputSchema: z.ZodType<Prisma.GameUpdateWithWhereUniqueWithoutDevelopersInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GameUpdateWithoutDevelopersInputSchema),z.lazy(() => GameUncheckedUpdateWithoutDevelopersInputSchema) ]),
}).strict();

export const GameUpdateManyWithWhereWithoutDevelopersInputSchema: z.ZodType<Prisma.GameUpdateManyWithWhereWithoutDevelopersInput> = z.object({
  where: z.lazy(() => GameScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GameUpdateManyMutationInputSchema),z.lazy(() => GameUncheckedUpdateManyWithoutDevelopersInputSchema) ]),
}).strict();

export const GameScalarWhereInputSchema: z.ZodType<Prisma.GameScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GameScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GameScalarWhereInputSchema),z.lazy(() => GameScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => DecimalFilterSchema),z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }) ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  releaseDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rating: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const GameCreateWithoutPublishersInputSchema: z.ZodType<Prisma.GameCreateWithoutPublishersInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  developers: z.lazy(() => DeveloperCreateNestedManyWithoutGamesInputSchema).optional(),
  platforms: z.lazy(() => PlatformCreateNestedManyWithoutGamesInputSchema).optional(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutGamesInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutGamesInputSchema).optional()
}).strict();

export const GameUncheckedCreateWithoutPublishersInputSchema: z.ZodType<Prisma.GameUncheckedCreateWithoutPublishersInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  developers: z.lazy(() => DeveloperUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  platforms: z.lazy(() => PlatformUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutGamesInputSchema).optional()
}).strict();

export const GameCreateOrConnectWithoutPublishersInputSchema: z.ZodType<Prisma.GameCreateOrConnectWithoutPublishersInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GameCreateWithoutPublishersInputSchema),z.lazy(() => GameUncheckedCreateWithoutPublishersInputSchema) ]),
}).strict();

export const GameUpsertWithWhereUniqueWithoutPublishersInputSchema: z.ZodType<Prisma.GameUpsertWithWhereUniqueWithoutPublishersInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GameUpdateWithoutPublishersInputSchema),z.lazy(() => GameUncheckedUpdateWithoutPublishersInputSchema) ]),
  create: z.union([ z.lazy(() => GameCreateWithoutPublishersInputSchema),z.lazy(() => GameUncheckedCreateWithoutPublishersInputSchema) ]),
}).strict();

export const GameUpdateWithWhereUniqueWithoutPublishersInputSchema: z.ZodType<Prisma.GameUpdateWithWhereUniqueWithoutPublishersInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GameUpdateWithoutPublishersInputSchema),z.lazy(() => GameUncheckedUpdateWithoutPublishersInputSchema) ]),
}).strict();

export const GameUpdateManyWithWhereWithoutPublishersInputSchema: z.ZodType<Prisma.GameUpdateManyWithWhereWithoutPublishersInput> = z.object({
  where: z.lazy(() => GameScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GameUpdateManyMutationInputSchema),z.lazy(() => GameUncheckedUpdateManyWithoutPublishersInputSchema) ]),
}).strict();

export const GameCreateWithoutPlatformsInputSchema: z.ZodType<Prisma.GameCreateWithoutPlatformsInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  developers: z.lazy(() => DeveloperCreateNestedManyWithoutGamesInputSchema).optional(),
  publishers: z.lazy(() => PublisherCreateNestedManyWithoutGamesInputSchema).optional(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutGamesInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutGamesInputSchema).optional()
}).strict();

export const GameUncheckedCreateWithoutPlatformsInputSchema: z.ZodType<Prisma.GameUncheckedCreateWithoutPlatformsInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  developers: z.lazy(() => DeveloperUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  publishers: z.lazy(() => PublisherUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutGamesInputSchema).optional()
}).strict();

export const GameCreateOrConnectWithoutPlatformsInputSchema: z.ZodType<Prisma.GameCreateOrConnectWithoutPlatformsInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GameCreateWithoutPlatformsInputSchema),z.lazy(() => GameUncheckedCreateWithoutPlatformsInputSchema) ]),
}).strict();

export const GameUpsertWithWhereUniqueWithoutPlatformsInputSchema: z.ZodType<Prisma.GameUpsertWithWhereUniqueWithoutPlatformsInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GameUpdateWithoutPlatformsInputSchema),z.lazy(() => GameUncheckedUpdateWithoutPlatformsInputSchema) ]),
  create: z.union([ z.lazy(() => GameCreateWithoutPlatformsInputSchema),z.lazy(() => GameUncheckedCreateWithoutPlatformsInputSchema) ]),
}).strict();

export const GameUpdateWithWhereUniqueWithoutPlatformsInputSchema: z.ZodType<Prisma.GameUpdateWithWhereUniqueWithoutPlatformsInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GameUpdateWithoutPlatformsInputSchema),z.lazy(() => GameUncheckedUpdateWithoutPlatformsInputSchema) ]),
}).strict();

export const GameUpdateManyWithWhereWithoutPlatformsInputSchema: z.ZodType<Prisma.GameUpdateManyWithWhereWithoutPlatformsInput> = z.object({
  where: z.lazy(() => GameScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GameUpdateManyMutationInputSchema),z.lazy(() => GameUncheckedUpdateManyWithoutPlatformsInputSchema) ]),
}).strict();

export const GameCreateWithoutGenresInputSchema: z.ZodType<Prisma.GameCreateWithoutGenresInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  developers: z.lazy(() => DeveloperCreateNestedManyWithoutGamesInputSchema).optional(),
  publishers: z.lazy(() => PublisherCreateNestedManyWithoutGamesInputSchema).optional(),
  platforms: z.lazy(() => PlatformCreateNestedManyWithoutGamesInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutGamesInputSchema).optional()
}).strict();

export const GameUncheckedCreateWithoutGenresInputSchema: z.ZodType<Prisma.GameUncheckedCreateWithoutGenresInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  developers: z.lazy(() => DeveloperUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  publishers: z.lazy(() => PublisherUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  platforms: z.lazy(() => PlatformUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutGamesInputSchema).optional()
}).strict();

export const GameCreateOrConnectWithoutGenresInputSchema: z.ZodType<Prisma.GameCreateOrConnectWithoutGenresInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GameCreateWithoutGenresInputSchema),z.lazy(() => GameUncheckedCreateWithoutGenresInputSchema) ]),
}).strict();

export const GameUpsertWithWhereUniqueWithoutGenresInputSchema: z.ZodType<Prisma.GameUpsertWithWhereUniqueWithoutGenresInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GameUpdateWithoutGenresInputSchema),z.lazy(() => GameUncheckedUpdateWithoutGenresInputSchema) ]),
  create: z.union([ z.lazy(() => GameCreateWithoutGenresInputSchema),z.lazy(() => GameUncheckedCreateWithoutGenresInputSchema) ]),
}).strict();

export const GameUpdateWithWhereUniqueWithoutGenresInputSchema: z.ZodType<Prisma.GameUpdateWithWhereUniqueWithoutGenresInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GameUpdateWithoutGenresInputSchema),z.lazy(() => GameUncheckedUpdateWithoutGenresInputSchema) ]),
}).strict();

export const GameUpdateManyWithWhereWithoutGenresInputSchema: z.ZodType<Prisma.GameUpdateManyWithWhereWithoutGenresInput> = z.object({
  where: z.lazy(() => GameScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GameUpdateManyMutationInputSchema),z.lazy(() => GameUncheckedUpdateManyWithoutGenresInputSchema) ]),
}).strict();

export const GameCreateWithoutTagsInputSchema: z.ZodType<Prisma.GameCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  developers: z.lazy(() => DeveloperCreateNestedManyWithoutGamesInputSchema).optional(),
  publishers: z.lazy(() => PublisherCreateNestedManyWithoutGamesInputSchema).optional(),
  platforms: z.lazy(() => PlatformCreateNestedManyWithoutGamesInputSchema).optional(),
  genres: z.lazy(() => GenreCreateNestedManyWithoutGamesInputSchema).optional()
}).strict();

export const GameUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.GameUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  slug: z.string(),
  name: z.string(),
  price: z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  description: z.string().optional().nullable(),
  releaseDate: z.coerce.date(),
  imageUrl: z.string().optional().nullable(),
  rating: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  developers: z.lazy(() => DeveloperUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  publishers: z.lazy(() => PublisherUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  platforms: z.lazy(() => PlatformUncheckedCreateNestedManyWithoutGamesInputSchema).optional(),
  genres: z.lazy(() => GenreUncheckedCreateNestedManyWithoutGamesInputSchema).optional()
}).strict();

export const GameCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.GameCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GameCreateWithoutTagsInputSchema),z.lazy(() => GameUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const GameUpsertWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.GameUpsertWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => GameUpdateWithoutTagsInputSchema),z.lazy(() => GameUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => GameCreateWithoutTagsInputSchema),z.lazy(() => GameUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const GameUpdateWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.GameUpdateWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => GameWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => GameUpdateWithoutTagsInputSchema),z.lazy(() => GameUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const GameUpdateManyWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.GameUpdateManyWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => GameScalarWhereInputSchema),
  data: z.union([ z.lazy(() => GameUpdateManyMutationInputSchema),z.lazy(() => GameUncheckedUpdateManyWithoutTagsInputSchema) ]),
}).strict();

export const DeveloperUpdateWithoutGamesInputSchema: z.ZodType<Prisma.DeveloperUpdateWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeveloperUncheckedUpdateWithoutGamesInputSchema: z.ZodType<Prisma.DeveloperUncheckedUpdateWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DeveloperUncheckedUpdateManyWithoutGamesInputSchema: z.ZodType<Prisma.DeveloperUncheckedUpdateManyWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PublisherUpdateWithoutGamesInputSchema: z.ZodType<Prisma.PublisherUpdateWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PublisherUncheckedUpdateWithoutGamesInputSchema: z.ZodType<Prisma.PublisherUncheckedUpdateWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PublisherUncheckedUpdateManyWithoutGamesInputSchema: z.ZodType<Prisma.PublisherUncheckedUpdateManyWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlatformUpdateWithoutGamesInputSchema: z.ZodType<Prisma.PlatformUpdateWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlatformUncheckedUpdateWithoutGamesInputSchema: z.ZodType<Prisma.PlatformUncheckedUpdateWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PlatformUncheckedUpdateManyWithoutGamesInputSchema: z.ZodType<Prisma.PlatformUncheckedUpdateManyWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GenreUpdateWithoutGamesInputSchema: z.ZodType<Prisma.GenreUpdateWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GenreUncheckedUpdateWithoutGamesInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GenreUncheckedUpdateManyWithoutGamesInputSchema: z.ZodType<Prisma.GenreUncheckedUpdateManyWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUpdateWithoutGamesInputSchema: z.ZodType<Prisma.TagUpdateWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateWithoutGamesInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyWithoutGamesInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutGamesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameUpdateWithoutDevelopersInputSchema: z.ZodType<Prisma.GameUpdateWithoutDevelopersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  publishers: z.lazy(() => PublisherUpdateManyWithoutGamesNestedInputSchema).optional(),
  platforms: z.lazy(() => PlatformUpdateManyWithoutGamesNestedInputSchema).optional(),
  genres: z.lazy(() => GenreUpdateManyWithoutGamesNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutGamesNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateWithoutDevelopersInputSchema: z.ZodType<Prisma.GameUncheckedUpdateWithoutDevelopersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  publishers: z.lazy(() => PublisherUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  platforms: z.lazy(() => PlatformUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutGamesNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateManyWithoutDevelopersInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyWithoutDevelopersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameUpdateWithoutPublishersInputSchema: z.ZodType<Prisma.GameUpdateWithoutPublishersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  developers: z.lazy(() => DeveloperUpdateManyWithoutGamesNestedInputSchema).optional(),
  platforms: z.lazy(() => PlatformUpdateManyWithoutGamesNestedInputSchema).optional(),
  genres: z.lazy(() => GenreUpdateManyWithoutGamesNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutGamesNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateWithoutPublishersInputSchema: z.ZodType<Prisma.GameUncheckedUpdateWithoutPublishersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  developers: z.lazy(() => DeveloperUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  platforms: z.lazy(() => PlatformUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutGamesNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateManyWithoutPublishersInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyWithoutPublishersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameUpdateWithoutPlatformsInputSchema: z.ZodType<Prisma.GameUpdateWithoutPlatformsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  developers: z.lazy(() => DeveloperUpdateManyWithoutGamesNestedInputSchema).optional(),
  publishers: z.lazy(() => PublisherUpdateManyWithoutGamesNestedInputSchema).optional(),
  genres: z.lazy(() => GenreUpdateManyWithoutGamesNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutGamesNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateWithoutPlatformsInputSchema: z.ZodType<Prisma.GameUncheckedUpdateWithoutPlatformsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  developers: z.lazy(() => DeveloperUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  publishers: z.lazy(() => PublisherUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutGamesNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateManyWithoutPlatformsInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyWithoutPlatformsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameUpdateWithoutGenresInputSchema: z.ZodType<Prisma.GameUpdateWithoutGenresInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  developers: z.lazy(() => DeveloperUpdateManyWithoutGamesNestedInputSchema).optional(),
  publishers: z.lazy(() => PublisherUpdateManyWithoutGamesNestedInputSchema).optional(),
  platforms: z.lazy(() => PlatformUpdateManyWithoutGamesNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutGamesNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateWithoutGenresInputSchema: z.ZodType<Prisma.GameUncheckedUpdateWithoutGenresInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  developers: z.lazy(() => DeveloperUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  publishers: z.lazy(() => PublisherUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  platforms: z.lazy(() => PlatformUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutGamesNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateManyWithoutGenresInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyWithoutGenresInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GameUpdateWithoutTagsInputSchema: z.ZodType<Prisma.GameUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  developers: z.lazy(() => DeveloperUpdateManyWithoutGamesNestedInputSchema).optional(),
  publishers: z.lazy(() => PublisherUpdateManyWithoutGamesNestedInputSchema).optional(),
  platforms: z.lazy(() => PlatformUpdateManyWithoutGamesNestedInputSchema).optional(),
  genres: z.lazy(() => GenreUpdateManyWithoutGamesNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.GameUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  developers: z.lazy(() => DeveloperUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  publishers: z.lazy(() => PublisherUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  platforms: z.lazy(() => PlatformUncheckedUpdateManyWithoutGamesNestedInputSchema).optional(),
  genres: z.lazy(() => GenreUncheckedUpdateManyWithoutGamesNestedInputSchema).optional()
}).strict();

export const GameUncheckedUpdateManyWithoutTagsInputSchema: z.ZodType<Prisma.GameUncheckedUpdateManyWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  price: z.union([ z.union([z.number(),z.string(),z.instanceof(Decimal),z.instanceof(Prisma.Decimal),DecimalJsLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  releaseDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rating: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const GameFindFirstArgsSchema: z.ZodType<Prisma.GameFindFirstArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereInputSchema.optional(),
  orderBy: z.union([ GameOrderByWithRelationInputSchema.array(),GameOrderByWithRelationInputSchema ]).optional(),
  cursor: GameWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GameScalarFieldEnumSchema,GameScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GameFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GameFindFirstOrThrowArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereInputSchema.optional(),
  orderBy: z.union([ GameOrderByWithRelationInputSchema.array(),GameOrderByWithRelationInputSchema ]).optional(),
  cursor: GameWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GameScalarFieldEnumSchema,GameScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GameFindManyArgsSchema: z.ZodType<Prisma.GameFindManyArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereInputSchema.optional(),
  orderBy: z.union([ GameOrderByWithRelationInputSchema.array(),GameOrderByWithRelationInputSchema ]).optional(),
  cursor: GameWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GameScalarFieldEnumSchema,GameScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GameAggregateArgsSchema: z.ZodType<Prisma.GameAggregateArgs> = z.object({
  where: GameWhereInputSchema.optional(),
  orderBy: z.union([ GameOrderByWithRelationInputSchema.array(),GameOrderByWithRelationInputSchema ]).optional(),
  cursor: GameWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GameGroupByArgsSchema: z.ZodType<Prisma.GameGroupByArgs> = z.object({
  where: GameWhereInputSchema.optional(),
  orderBy: z.union([ GameOrderByWithAggregationInputSchema.array(),GameOrderByWithAggregationInputSchema ]).optional(),
  by: GameScalarFieldEnumSchema.array(),
  having: GameScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GameFindUniqueArgsSchema: z.ZodType<Prisma.GameFindUniqueArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereUniqueInputSchema,
}).strict() ;

export const GameFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GameFindUniqueOrThrowArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereUniqueInputSchema,
}).strict() ;

export const DeveloperFindFirstArgsSchema: z.ZodType<Prisma.DeveloperFindFirstArgs> = z.object({
  select: DeveloperSelectSchema.optional(),
  include: DeveloperIncludeSchema.optional(),
  where: DeveloperWhereInputSchema.optional(),
  orderBy: z.union([ DeveloperOrderByWithRelationInputSchema.array(),DeveloperOrderByWithRelationInputSchema ]).optional(),
  cursor: DeveloperWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DeveloperScalarFieldEnumSchema,DeveloperScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DeveloperFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DeveloperFindFirstOrThrowArgs> = z.object({
  select: DeveloperSelectSchema.optional(),
  include: DeveloperIncludeSchema.optional(),
  where: DeveloperWhereInputSchema.optional(),
  orderBy: z.union([ DeveloperOrderByWithRelationInputSchema.array(),DeveloperOrderByWithRelationInputSchema ]).optional(),
  cursor: DeveloperWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DeveloperScalarFieldEnumSchema,DeveloperScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DeveloperFindManyArgsSchema: z.ZodType<Prisma.DeveloperFindManyArgs> = z.object({
  select: DeveloperSelectSchema.optional(),
  include: DeveloperIncludeSchema.optional(),
  where: DeveloperWhereInputSchema.optional(),
  orderBy: z.union([ DeveloperOrderByWithRelationInputSchema.array(),DeveloperOrderByWithRelationInputSchema ]).optional(),
  cursor: DeveloperWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DeveloperScalarFieldEnumSchema,DeveloperScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DeveloperAggregateArgsSchema: z.ZodType<Prisma.DeveloperAggregateArgs> = z.object({
  where: DeveloperWhereInputSchema.optional(),
  orderBy: z.union([ DeveloperOrderByWithRelationInputSchema.array(),DeveloperOrderByWithRelationInputSchema ]).optional(),
  cursor: DeveloperWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DeveloperGroupByArgsSchema: z.ZodType<Prisma.DeveloperGroupByArgs> = z.object({
  where: DeveloperWhereInputSchema.optional(),
  orderBy: z.union([ DeveloperOrderByWithAggregationInputSchema.array(),DeveloperOrderByWithAggregationInputSchema ]).optional(),
  by: DeveloperScalarFieldEnumSchema.array(),
  having: DeveloperScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DeveloperFindUniqueArgsSchema: z.ZodType<Prisma.DeveloperFindUniqueArgs> = z.object({
  select: DeveloperSelectSchema.optional(),
  include: DeveloperIncludeSchema.optional(),
  where: DeveloperWhereUniqueInputSchema,
}).strict() ;

export const DeveloperFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DeveloperFindUniqueOrThrowArgs> = z.object({
  select: DeveloperSelectSchema.optional(),
  include: DeveloperIncludeSchema.optional(),
  where: DeveloperWhereUniqueInputSchema,
}).strict() ;

export const PublisherFindFirstArgsSchema: z.ZodType<Prisma.PublisherFindFirstArgs> = z.object({
  select: PublisherSelectSchema.optional(),
  include: PublisherIncludeSchema.optional(),
  where: PublisherWhereInputSchema.optional(),
  orderBy: z.union([ PublisherOrderByWithRelationInputSchema.array(),PublisherOrderByWithRelationInputSchema ]).optional(),
  cursor: PublisherWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PublisherScalarFieldEnumSchema,PublisherScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PublisherFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PublisherFindFirstOrThrowArgs> = z.object({
  select: PublisherSelectSchema.optional(),
  include: PublisherIncludeSchema.optional(),
  where: PublisherWhereInputSchema.optional(),
  orderBy: z.union([ PublisherOrderByWithRelationInputSchema.array(),PublisherOrderByWithRelationInputSchema ]).optional(),
  cursor: PublisherWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PublisherScalarFieldEnumSchema,PublisherScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PublisherFindManyArgsSchema: z.ZodType<Prisma.PublisherFindManyArgs> = z.object({
  select: PublisherSelectSchema.optional(),
  include: PublisherIncludeSchema.optional(),
  where: PublisherWhereInputSchema.optional(),
  orderBy: z.union([ PublisherOrderByWithRelationInputSchema.array(),PublisherOrderByWithRelationInputSchema ]).optional(),
  cursor: PublisherWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PublisherScalarFieldEnumSchema,PublisherScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PublisherAggregateArgsSchema: z.ZodType<Prisma.PublisherAggregateArgs> = z.object({
  where: PublisherWhereInputSchema.optional(),
  orderBy: z.union([ PublisherOrderByWithRelationInputSchema.array(),PublisherOrderByWithRelationInputSchema ]).optional(),
  cursor: PublisherWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PublisherGroupByArgsSchema: z.ZodType<Prisma.PublisherGroupByArgs> = z.object({
  where: PublisherWhereInputSchema.optional(),
  orderBy: z.union([ PublisherOrderByWithAggregationInputSchema.array(),PublisherOrderByWithAggregationInputSchema ]).optional(),
  by: PublisherScalarFieldEnumSchema.array(),
  having: PublisherScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PublisherFindUniqueArgsSchema: z.ZodType<Prisma.PublisherFindUniqueArgs> = z.object({
  select: PublisherSelectSchema.optional(),
  include: PublisherIncludeSchema.optional(),
  where: PublisherWhereUniqueInputSchema,
}).strict() ;

export const PublisherFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PublisherFindUniqueOrThrowArgs> = z.object({
  select: PublisherSelectSchema.optional(),
  include: PublisherIncludeSchema.optional(),
  where: PublisherWhereUniqueInputSchema,
}).strict() ;

export const PlatformFindFirstArgsSchema: z.ZodType<Prisma.PlatformFindFirstArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereInputSchema.optional(),
  orderBy: z.union([ PlatformOrderByWithRelationInputSchema.array(),PlatformOrderByWithRelationInputSchema ]).optional(),
  cursor: PlatformWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlatformScalarFieldEnumSchema,PlatformScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlatformFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PlatformFindFirstOrThrowArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereInputSchema.optional(),
  orderBy: z.union([ PlatformOrderByWithRelationInputSchema.array(),PlatformOrderByWithRelationInputSchema ]).optional(),
  cursor: PlatformWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlatformScalarFieldEnumSchema,PlatformScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlatformFindManyArgsSchema: z.ZodType<Prisma.PlatformFindManyArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereInputSchema.optional(),
  orderBy: z.union([ PlatformOrderByWithRelationInputSchema.array(),PlatformOrderByWithRelationInputSchema ]).optional(),
  cursor: PlatformWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PlatformScalarFieldEnumSchema,PlatformScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PlatformAggregateArgsSchema: z.ZodType<Prisma.PlatformAggregateArgs> = z.object({
  where: PlatformWhereInputSchema.optional(),
  orderBy: z.union([ PlatformOrderByWithRelationInputSchema.array(),PlatformOrderByWithRelationInputSchema ]).optional(),
  cursor: PlatformWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlatformGroupByArgsSchema: z.ZodType<Prisma.PlatformGroupByArgs> = z.object({
  where: PlatformWhereInputSchema.optional(),
  orderBy: z.union([ PlatformOrderByWithAggregationInputSchema.array(),PlatformOrderByWithAggregationInputSchema ]).optional(),
  by: PlatformScalarFieldEnumSchema.array(),
  having: PlatformScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PlatformFindUniqueArgsSchema: z.ZodType<Prisma.PlatformFindUniqueArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereUniqueInputSchema,
}).strict() ;

export const PlatformFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PlatformFindUniqueOrThrowArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereUniqueInputSchema,
}).strict() ;

export const GenreFindFirstArgsSchema: z.ZodType<Prisma.GenreFindFirstArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithRelationInputSchema.array(),GenreOrderByWithRelationInputSchema ]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GenreScalarFieldEnumSchema,GenreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GenreFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GenreFindFirstOrThrowArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithRelationInputSchema.array(),GenreOrderByWithRelationInputSchema ]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GenreScalarFieldEnumSchema,GenreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GenreFindManyArgsSchema: z.ZodType<Prisma.GenreFindManyArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithRelationInputSchema.array(),GenreOrderByWithRelationInputSchema ]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GenreScalarFieldEnumSchema,GenreScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GenreAggregateArgsSchema: z.ZodType<Prisma.GenreAggregateArgs> = z.object({
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithRelationInputSchema.array(),GenreOrderByWithRelationInputSchema ]).optional(),
  cursor: GenreWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GenreGroupByArgsSchema: z.ZodType<Prisma.GenreGroupByArgs> = z.object({
  where: GenreWhereInputSchema.optional(),
  orderBy: z.union([ GenreOrderByWithAggregationInputSchema.array(),GenreOrderByWithAggregationInputSchema ]).optional(),
  by: GenreScalarFieldEnumSchema.array(),
  having: GenreScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GenreFindUniqueArgsSchema: z.ZodType<Prisma.GenreFindUniqueArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
}).strict() ;

export const GenreFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GenreFindUniqueOrThrowArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
}).strict() ;

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(),TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(),
  having: TagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const GameCreateArgsSchema: z.ZodType<Prisma.GameCreateArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  data: z.union([ GameCreateInputSchema,GameUncheckedCreateInputSchema ]),
}).strict() ;

export const GameUpsertArgsSchema: z.ZodType<Prisma.GameUpsertArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereUniqueInputSchema,
  create: z.union([ GameCreateInputSchema,GameUncheckedCreateInputSchema ]),
  update: z.union([ GameUpdateInputSchema,GameUncheckedUpdateInputSchema ]),
}).strict() ;

export const GameCreateManyArgsSchema: z.ZodType<Prisma.GameCreateManyArgs> = z.object({
  data: z.union([ GameCreateManyInputSchema,GameCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GameCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GameCreateManyAndReturnArgs> = z.object({
  data: z.union([ GameCreateManyInputSchema,GameCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GameDeleteArgsSchema: z.ZodType<Prisma.GameDeleteArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  where: GameWhereUniqueInputSchema,
}).strict() ;

export const GameUpdateArgsSchema: z.ZodType<Prisma.GameUpdateArgs> = z.object({
  select: GameSelectSchema.optional(),
  include: GameIncludeSchema.optional(),
  data: z.union([ GameUpdateInputSchema,GameUncheckedUpdateInputSchema ]),
  where: GameWhereUniqueInputSchema,
}).strict() ;

export const GameUpdateManyArgsSchema: z.ZodType<Prisma.GameUpdateManyArgs> = z.object({
  data: z.union([ GameUpdateManyMutationInputSchema,GameUncheckedUpdateManyInputSchema ]),
  where: GameWhereInputSchema.optional(),
}).strict() ;

export const GameDeleteManyArgsSchema: z.ZodType<Prisma.GameDeleteManyArgs> = z.object({
  where: GameWhereInputSchema.optional(),
}).strict() ;

export const DeveloperCreateArgsSchema: z.ZodType<Prisma.DeveloperCreateArgs> = z.object({
  select: DeveloperSelectSchema.optional(),
  include: DeveloperIncludeSchema.optional(),
  data: z.union([ DeveloperCreateInputSchema,DeveloperUncheckedCreateInputSchema ]),
}).strict() ;

export const DeveloperUpsertArgsSchema: z.ZodType<Prisma.DeveloperUpsertArgs> = z.object({
  select: DeveloperSelectSchema.optional(),
  include: DeveloperIncludeSchema.optional(),
  where: DeveloperWhereUniqueInputSchema,
  create: z.union([ DeveloperCreateInputSchema,DeveloperUncheckedCreateInputSchema ]),
  update: z.union([ DeveloperUpdateInputSchema,DeveloperUncheckedUpdateInputSchema ]),
}).strict() ;

export const DeveloperCreateManyArgsSchema: z.ZodType<Prisma.DeveloperCreateManyArgs> = z.object({
  data: z.union([ DeveloperCreateManyInputSchema,DeveloperCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DeveloperCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DeveloperCreateManyAndReturnArgs> = z.object({
  data: z.union([ DeveloperCreateManyInputSchema,DeveloperCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DeveloperDeleteArgsSchema: z.ZodType<Prisma.DeveloperDeleteArgs> = z.object({
  select: DeveloperSelectSchema.optional(),
  include: DeveloperIncludeSchema.optional(),
  where: DeveloperWhereUniqueInputSchema,
}).strict() ;

export const DeveloperUpdateArgsSchema: z.ZodType<Prisma.DeveloperUpdateArgs> = z.object({
  select: DeveloperSelectSchema.optional(),
  include: DeveloperIncludeSchema.optional(),
  data: z.union([ DeveloperUpdateInputSchema,DeveloperUncheckedUpdateInputSchema ]),
  where: DeveloperWhereUniqueInputSchema,
}).strict() ;

export const DeveloperUpdateManyArgsSchema: z.ZodType<Prisma.DeveloperUpdateManyArgs> = z.object({
  data: z.union([ DeveloperUpdateManyMutationInputSchema,DeveloperUncheckedUpdateManyInputSchema ]),
  where: DeveloperWhereInputSchema.optional(),
}).strict() ;

export const DeveloperDeleteManyArgsSchema: z.ZodType<Prisma.DeveloperDeleteManyArgs> = z.object({
  where: DeveloperWhereInputSchema.optional(),
}).strict() ;

export const PublisherCreateArgsSchema: z.ZodType<Prisma.PublisherCreateArgs> = z.object({
  select: PublisherSelectSchema.optional(),
  include: PublisherIncludeSchema.optional(),
  data: z.union([ PublisherCreateInputSchema,PublisherUncheckedCreateInputSchema ]),
}).strict() ;

export const PublisherUpsertArgsSchema: z.ZodType<Prisma.PublisherUpsertArgs> = z.object({
  select: PublisherSelectSchema.optional(),
  include: PublisherIncludeSchema.optional(),
  where: PublisherWhereUniqueInputSchema,
  create: z.union([ PublisherCreateInputSchema,PublisherUncheckedCreateInputSchema ]),
  update: z.union([ PublisherUpdateInputSchema,PublisherUncheckedUpdateInputSchema ]),
}).strict() ;

export const PublisherCreateManyArgsSchema: z.ZodType<Prisma.PublisherCreateManyArgs> = z.object({
  data: z.union([ PublisherCreateManyInputSchema,PublisherCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PublisherCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PublisherCreateManyAndReturnArgs> = z.object({
  data: z.union([ PublisherCreateManyInputSchema,PublisherCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PublisherDeleteArgsSchema: z.ZodType<Prisma.PublisherDeleteArgs> = z.object({
  select: PublisherSelectSchema.optional(),
  include: PublisherIncludeSchema.optional(),
  where: PublisherWhereUniqueInputSchema,
}).strict() ;

export const PublisherUpdateArgsSchema: z.ZodType<Prisma.PublisherUpdateArgs> = z.object({
  select: PublisherSelectSchema.optional(),
  include: PublisherIncludeSchema.optional(),
  data: z.union([ PublisherUpdateInputSchema,PublisherUncheckedUpdateInputSchema ]),
  where: PublisherWhereUniqueInputSchema,
}).strict() ;

export const PublisherUpdateManyArgsSchema: z.ZodType<Prisma.PublisherUpdateManyArgs> = z.object({
  data: z.union([ PublisherUpdateManyMutationInputSchema,PublisherUncheckedUpdateManyInputSchema ]),
  where: PublisherWhereInputSchema.optional(),
}).strict() ;

export const PublisherDeleteManyArgsSchema: z.ZodType<Prisma.PublisherDeleteManyArgs> = z.object({
  where: PublisherWhereInputSchema.optional(),
}).strict() ;

export const PlatformCreateArgsSchema: z.ZodType<Prisma.PlatformCreateArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  data: z.union([ PlatformCreateInputSchema,PlatformUncheckedCreateInputSchema ]),
}).strict() ;

export const PlatformUpsertArgsSchema: z.ZodType<Prisma.PlatformUpsertArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereUniqueInputSchema,
  create: z.union([ PlatformCreateInputSchema,PlatformUncheckedCreateInputSchema ]),
  update: z.union([ PlatformUpdateInputSchema,PlatformUncheckedUpdateInputSchema ]),
}).strict() ;

export const PlatformCreateManyArgsSchema: z.ZodType<Prisma.PlatformCreateManyArgs> = z.object({
  data: z.union([ PlatformCreateManyInputSchema,PlatformCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PlatformCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PlatformCreateManyAndReturnArgs> = z.object({
  data: z.union([ PlatformCreateManyInputSchema,PlatformCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PlatformDeleteArgsSchema: z.ZodType<Prisma.PlatformDeleteArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  where: PlatformWhereUniqueInputSchema,
}).strict() ;

export const PlatformUpdateArgsSchema: z.ZodType<Prisma.PlatformUpdateArgs> = z.object({
  select: PlatformSelectSchema.optional(),
  include: PlatformIncludeSchema.optional(),
  data: z.union([ PlatformUpdateInputSchema,PlatformUncheckedUpdateInputSchema ]),
  where: PlatformWhereUniqueInputSchema,
}).strict() ;

export const PlatformUpdateManyArgsSchema: z.ZodType<Prisma.PlatformUpdateManyArgs> = z.object({
  data: z.union([ PlatformUpdateManyMutationInputSchema,PlatformUncheckedUpdateManyInputSchema ]),
  where: PlatformWhereInputSchema.optional(),
}).strict() ;

export const PlatformDeleteManyArgsSchema: z.ZodType<Prisma.PlatformDeleteManyArgs> = z.object({
  where: PlatformWhereInputSchema.optional(),
}).strict() ;

export const GenreCreateArgsSchema: z.ZodType<Prisma.GenreCreateArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  data: z.union([ GenreCreateInputSchema,GenreUncheckedCreateInputSchema ]),
}).strict() ;

export const GenreUpsertArgsSchema: z.ZodType<Prisma.GenreUpsertArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
  create: z.union([ GenreCreateInputSchema,GenreUncheckedCreateInputSchema ]),
  update: z.union([ GenreUpdateInputSchema,GenreUncheckedUpdateInputSchema ]),
}).strict() ;

export const GenreCreateManyArgsSchema: z.ZodType<Prisma.GenreCreateManyArgs> = z.object({
  data: z.union([ GenreCreateManyInputSchema,GenreCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GenreCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GenreCreateManyAndReturnArgs> = z.object({
  data: z.union([ GenreCreateManyInputSchema,GenreCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GenreDeleteArgsSchema: z.ZodType<Prisma.GenreDeleteArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  where: GenreWhereUniqueInputSchema,
}).strict() ;

export const GenreUpdateArgsSchema: z.ZodType<Prisma.GenreUpdateArgs> = z.object({
  select: GenreSelectSchema.optional(),
  include: GenreIncludeSchema.optional(),
  data: z.union([ GenreUpdateInputSchema,GenreUncheckedUpdateInputSchema ]),
  where: GenreWhereUniqueInputSchema,
}).strict() ;

export const GenreUpdateManyArgsSchema: z.ZodType<Prisma.GenreUpdateManyArgs> = z.object({
  data: z.union([ GenreUpdateManyMutationInputSchema,GenreUncheckedUpdateManyInputSchema ]),
  where: GenreWhereInputSchema.optional(),
}).strict() ;

export const GenreDeleteManyArgsSchema: z.ZodType<Prisma.GenreDeleteManyArgs> = z.object({
  where: GenreWhereInputSchema.optional(),
}).strict() ;

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
}).strict() ;

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
  create: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
}).strict() ;

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TagCreateManyAndReturnArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
}).strict() ;

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(),
}).strict() ;